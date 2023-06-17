import { listen } from '@/lib/queue'

export class TestQueueHandler {
  @listen('test', '')
  async(job: any) {
    console.log({
      d: job.data,
    })
  }
}
