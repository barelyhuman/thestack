import { config } from '@/configs'
import { get, post } from '@/lib/router'
import type { Request, Response } from 'express'

export default class Auth {
  @get('/login')
  showLogin(req, res) {
    return res.render('login.index')
  }

  @post('/login')
  attemptLogin(req, res: Response) {
    return res.redirect(302, '/')
  }

  @post('/auth/register')
  register(req: Request, res: Response) {
    const { email } = req.body
    req.pushToQueue(config.queue.email.name, {
      email: email,
      type: config.queue.email.types.loginEmail,
    })
  }

  @get('/auth/verify')
  verify(req: Request, res: Response) {}

  @get('/auth/accept')
  accept(req: Request, res: Response) {}
}
