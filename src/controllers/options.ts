import { OPTIONS } from '@/lib/constants'
import { get } from '@/lib/router'
import { Response } from 'express'

export class Options {
  @get('/options')
  getOptions(_: Request, res: Response) {
    return res.send(Object.values(OPTIONS))
  }
}
