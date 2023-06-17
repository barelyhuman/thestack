import { config } from '@/configs';
import { sendEmail } from '@/lib/email';
import { listen } from '@/lib/queue';
import { get, post } from '@/lib/router';
import type { Request, Response } from 'express';

export default class Auth {
  @post('/auth/register')
  register(req: Request, res: Response) {
    const { email } = req.body;
    req.pushToQueue(config.queue.email.name, {
      email: email,
      type: config.queue.email.types.loginEmail,
    });
  }

  @listen(config.queue.email.name, config.queue.email.types.loginEmail)
  async handleEmail(job: any) {
    const toEmail = job.data.email;
    await sendEmail(toEmail);
  }

  @get('/auth/verify')
  verify(req: Request, res: Response) {}

  @get('/auth/accept')
  accept(req: Request, res: Response) {}
}
