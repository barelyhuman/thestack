import { get } from '@/lib/router'
import type { Response, Request } from 'express'

export default class Health {
  @get('/ping')
  ping(req: Request, res: Response) {
    return res.send({
      success: true,
      now: new Date().toISOString(),
    })
  }
}
