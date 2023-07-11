import { config } from '@/configs'
import { get, post } from '@/lib/router'
import type { Request, Response } from 'express'

export default class Auth {
  @get('/login')
  loginView(req, res) {
    return res.render('auth/login.njk')
  }

  @post('/login')
  attemptLogin(req, res: Response) {
    return res.redirect(302, '/')
  }

  @get('/register')
  registerView(req: Request, res: Response) {
    return res.render('auth/register.njk')
  }

  @post('/auth/register')
  register(req: Request, res: Response) {
    const { email } = req.body
    req.pushToQueue(config.queue.email.name, {
      email: email,
      type: config.queue.email.types.loginEmail,
    })
  }
}
