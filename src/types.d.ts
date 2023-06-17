import { db } from '@/lib/db';
import { emitToQueue } from '@/lib/queue';

declare module 'express' {
  interface Request {
    db: typeof db;
    pushToQueue: typeof emitToQueue;
  }
}
