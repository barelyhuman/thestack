import { config } from '@/configs'
import { createProducer } from '@/lib/queue'

// queues
createProducer(config.queue.email.name, config.redis)

// get the controllers
import '@/controllers/health'
import '@/controllers/auth'
