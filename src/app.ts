import { config as loadEnv } from 'dotenv'

loadEnv()

import '@/boot'
import { pushToQueue } from '@/lib/queue'
import { client, client as redisClient } from '@/lib/redis'
import { router } from '@/lib/router'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import expressLimiter from 'express-limiter'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import serveStatic from 'serve-static'
import cookieParser from 'cookie-parser'
import { initDocs } from './docs'
import session from 'express-session'
import Tokens from 'csrf'
import RedisStore from 'connect-redis'
import { config } from './configs'
import nunjucks from 'nunjucks'
import { errorMiddleware } from './middlewares/errors'
import flash from 'express-flash'

const csrf = new Tokens()
export const app = express()

export const initApp = ({ db }) => {
  // TODO: configure proper cors here
  app.use(cors())

  // Common defaults
  app.set('views', path.join(__dirname, 'views'))
  app.disable('x-powered-by')
  app.use(morgan('tiny'))
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'script-src': ["'self'", 'unpkg.com', 'fonts.bunny.net'],
        },
      },
    })
  )
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(
    compression({
      filter: (req, res) => {
        return Boolean(req.headers['x-no-compression'])
      },
    })
  )

  // Flash Messages for Errors and Info on Server Rendered Templates
  app.use(flash())

  // Configure templates
  nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
  })

  // Add in helpers for REST API Errors
  app.use(errorMiddleware)

  let redisStore = new RedisStore({
    client,
    // TODO: change this to your custom prefix
    prefix: 'thestack:',
  })

  app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: config.security.session,
      cookie: {
        // Requires HTTPS to work properly, better off left disabled when working
        // in local , and can be enabled in production where HTTPS redirection is
        // mandatory
        secure: config.isProduction,
      },
    })
  )

  // Basic CSRF Handling
  app.use((req, res, next) => {
    const token = req.cookies['csrf-token']

    if (req.method === 'GET') {
      const secret = csrf.secretSync()
      const secretToken = csrf.create(secret)
      // @ts-expect-error cannot deep interface with session
      req.session.csrfSecret = secret

      res.cookie('csrf-token', secretToken)
      res.locals.csrfToken = req.cookies['csrf-token']
    } else {
      // @ts-expect-error cannot deep interface with session
      if (!csrf.verify(req.session.csrfSecret, token)) {
        return res.status(403).send('Invalid CSRF token')
      }
    }

    next()
  })

  app.use('/public', serveStatic(path.join(__dirname, './public')))

  // Basic Rate limiter
  // TODO: change in the lookup and
  // expiry / total combination according to your usecase
  const limiter = expressLimiter(router, redisClient)
  app.use(
    limiter({
      path: '*',
      method: 'all',
      lookup: ['headers.x-forwarded-for', 'connection.remoteAddress'],
      // 1000 request / 5 mins
      total: 1000,
      expire: 1000 * 60 * 5,
    })
  )

  initDocs(app)

  app.use(extender(db))
  app.use(router)

  return app
}

const extender = db => (req: Request, res: Response, n: NextFunction) => {
  req.db = db
  req.pushToQueue = pushToQueue
  n()
}
