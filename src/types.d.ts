import { db } from '@/lib/db'
import { pushToQueue } from '@/lib/queue'

declare module 'express' {
  interface Request {
    db: typeof db
    pushToQueue: typeof pushToQueue
  }

  interface Response {
    // Error response Helpers from middleware/errors.ts
    badParameters(err: Error): void
    serverError(err: Error): void
    unauthorized(): void
  }
}
