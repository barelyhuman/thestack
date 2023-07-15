import { config } from '@/configs'
import { hashPassword, verifyPassword } from '@/lib/crypto'
import { get, post } from '@/lib/router'
import { notLoggedIn, optionalLoggedIn } from '@/middlewares/auth'
import { randomBytes } from 'crypto'
import type { Request, Response } from 'express'
import * as Yup from 'yup'

const CreateUserSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const LoginUserSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export default class Auth {
  @get('/logout', [optionalLoggedIn])
  logout(req: Request, res) {
    // @ts-expect-error token doesn't exist on session
    delete req.session.token
    return res.redirect(302, '/login')
  }

  @get('/login', [notLoggedIn])
  loginView(req, res) {
    return res.render('auth/login.njk')
  }

  @post('/login')
  async attemptLogin(req: Request, res: Response) {
    try {
      const payload = await LoginUserSchema.validate(req.body)

      const userDetails = await req.db.user.findFirst({
        where: {
          email: payload.email,
        },
      })

      if (!userDetails) {
        req.flash('error', 'Invalid credentials, please try again')
        return res.redirect(302, '/login')
      }

      const isPasswordValid = verifyPassword(
        payload.password,
        userDetails.password,
        userDetails.salt
      )

      if (!isPasswordValid) {
        req.flash('error', 'Invalid credentials, please try again')
        return res.redirect(302, '/login')
      }

      const authToken = randomBytes(32).toString('base64url')

      await req.db.tokens.create({
        data: {
          // TODO: get from request source
          name: 'Browser Token',
          userId: userDetails.id,
          authToken: authToken,
        },
      })

      // @ts-ignore
      req.session.token = authToken

      return res.redirect(302, '/posts')
    } catch (err) {
      console.error(err)

      if (err instanceof Yup.ValidationError) {
        res.badParameters(err)
        return
      }

      return res.serverError(err)
    }
  }

  @get('/register', [notLoggedIn])
  registerView(req: Request, res: Response) {
    return res.render('auth/register.njk')
  }

  @post('/register', [notLoggedIn])
  async register(req: Request, res: Response) {
    try {
      const payload = await CreateUserSchema.validate(req.body)

      const { pass, salt } = hashPassword(payload.password)

      const insertedUser = await req.db.user.create({
        data: {
          email: payload.email,
          name: payload.email,
          salt,
          password: pass,
        },
      })

      req.pushToQueue(config.queue.email.name, {
        email: payload.email,
        type: config.queue.email.types.loginEmail,
      })

      req.flash('info', 'Registered successfully, please log in')
      return res.redirect('/login')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        res.badParameters(err)
        return
      }

      return res.serverError(err)
    }
  }
}
