import { db } from '@/lib/db'
import { pushToQueue } from '@/lib/queue'

declare module 'express' {
  interface Request {
    db: typeof db
    pushToQueue: typeof pushToQueue
  }
}
