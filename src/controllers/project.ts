import { del, get, post } from '@/lib/router'
import { auth } from '@/middlewares/auth'
import type { Request, Response } from 'express'

export default class Project {
  @post('/project', [auth])
  create(req: Request, res: Response) {}

  @get('/project/:id', [auth])
  show(req: Request, res: Response) {}

  @post('/project/:id', [auth])
  update(req: Request, res: Response) {}

  @del('/project/:id', [auth])
  delete(req: Request, res: Response) {}
}
