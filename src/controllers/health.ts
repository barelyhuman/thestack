import { get } from '@/lib/router'
import type { Response, Request } from 'express'

export default class Health {
  /**
   *
   * GET /api/ping
   * @summary quickly check if the server is running or not
   * @returns 200 - success - application/json
   */
  @get('/api/ping')
  ping(req: Request, res: Response) {
    req.pushToQueue('test', {
      type: '',
    })
    return res.send({
      success: true,
      now: new Date().toISOString(),
    })
  }
}
