import { config } from '@/configs'
import { createProducer } from '@/lib/queue'

// example queues
// Inline name
createProducer('test')
// name from config
createProducer(config.queue.email.name)

// get the controllers
import '@/controllers/home'
import '@/controllers/options'
import '@/controllers/health'
import '@/controllers/auth'
import '@/controllers/post'
