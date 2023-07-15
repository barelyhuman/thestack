import { Request, Response } from 'express'
import { db } from '@/lib/db'

declare module 'express' {
  interface Request {
    currentUser?: {
      id: number
    }
  }
}

export async function notLoggedIn(req: Request, res: Response, next) {
  // @ts-expect-error session is a dynamic object
  let token = req.headers.authorization || req.session.token
  if (token) {
    return res.redirect(302, '/')
  }
  next()
}

export async function optionalLoggedIn(req: Request, res: Response, next) {
  // @ts-expect-error session is a dynamic object
  let token = req.headers.authorization || req.session.token
  if (!token) {
    return next()
  }

  const user = await getTokenUser(token, req.db)
  if (!user) {
    return next()
  }

  req.currentUser = user
  res.locals.authenticated = true

  next()
}

export async function auth(req: Request, res: Response, next) {
  // @ts-expect-error session is a dynamic object
  let token = req.headers.authorization || req.session.token
  if (!token) {
    req.flash(
      'error',
      "Sorry, you don't have enough permissions to perform this action"
    )
    return res.redirect(302, '/login')
  }

  const user = await getTokenUser(token, req.db)

  if (!user) {
    req.flash(
      'error',
      "Sorry, you don't have enough permissions to perform this action"
    )
    return res.redirect(302, '/login')
  }

  req.currentUser = user
  res.locals.authenticated = true

  next()
}

async function getTokenUser(token, dbConnector: typeof db) {
  const tokenDetails = await dbConnector.tokens.findFirst({
    where: {
      authToken: token,
    },
    include: {
      user: true,
    },
  })

  if (!tokenDetails) {
    return null
  }

  return {
    id: tokenDetails.user.id,
  }

  return null
}
