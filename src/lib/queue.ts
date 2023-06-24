import { config } from '@/configs'
import Bull from 'bull'

export function createProducer(name: string) {
  const bull = new Bull(name, {
    redis: config.redis,
  })
  return bull
}

export function pushToQueue(queueName: string, data: any) {
  const bull = new Bull(queueName, {
    redis: config.redis,
  })
  bull.add(data)
}

export function listen(queueName: string, queueType: string) {
  return (target: any, pk: string) => {
    const bull = new Bull(queueName, {
      redis: config.redis,
    })
    bull.process(async (job: any) => {
      if (job.data.type !== queueType) return
      return await target[pk](job)
    })
  }
}
