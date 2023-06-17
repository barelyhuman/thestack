import { config } from '@/configs'
import { sendEmail } from '@/lib/email'
import { listen } from '@/lib/queue'

export class EmailQueueHandler {
  @listen(config.queue.email.name, config.queue.email.types.loginEmail)
  async handleEmail(job: any) {
    const toEmail = job.data.email
    await sendEmail({
      toEmail,
      subject: 'hello human',
      html: '<h1>Please approve log-in request</h1>',
    })
  }
}
