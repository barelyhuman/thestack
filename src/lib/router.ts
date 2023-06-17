import { Router, Request, Response, NextFunction } from 'express'

export const router = Router()

type MiddlewareFunc = (req: Request, res: Response, n: NextFunction) => void

type RouterOptions = {
  path: string
  method: 'get' | 'post' | 'delete'
  middleware?: MiddlewareFunc[]
}

export const createMethodDecorator = (options: RouterOptions) => {
  return (target: any, pk: string) => {
    const middleware = options.middleware || []
    router[options.method](options.path, ...middleware, target[pk])
  }
}

export const get = (path: string, middleware?: MiddlewareFunc[]) => {
  return createMethodDecorator({
    method: 'get',
    path,
    middleware,
  })
}

export const post = (path: string, middleware?: MiddlewareFunc[]) => {
  return createMethodDecorator({
    method: 'post',
    path,
    middleware,
  })
}

export const del = (path: string, middleware?: MiddlewareFunc[]) => {
  return createMethodDecorator({
    method: 'delete',
    path,
    middleware,
  })
}
