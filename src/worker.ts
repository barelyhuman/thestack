import './jobs/test-queue-handler'
import './jobs/email-queue-handler'

setInterval(() => {}, 1 << 30)

console.log('Started Worker')
