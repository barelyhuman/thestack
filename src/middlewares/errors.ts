import { Response } from 'express'

export function errorMiddleware(_, res, next) {
  _injectErrorHelpers(res)
  next()
}

function _injectErrorHelpers(res: Response) {
  res.badParameters = function (err) {
    res.status(400).send({
      error: 'Bad Parameters',
      __stack: err,
    })
  }

  res.serverError = function (err) {
    res.status(500).send({
      error: 'Oops! Something went wrong...',
      __stack: err,
    })
  }

  res.unauthorized = function () {
    res.status(401).send({
      error: "Sorry, you don't have enough permissions to perform this action",
    })
  }
}
