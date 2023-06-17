import { Redis } from 'ioredis'
import { config } from '@/configs'

export const client = new Redis(config.redis)
