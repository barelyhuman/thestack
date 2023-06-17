import Bull from 'bull';

const queueRegister = new Map();

export function createProducer(name: string, options: any) {
  const bull = new Bull(name, {
    redis: options,
  });
  queueRegister.set(name, bull);
  return bull;
}

export function emitToQueue(queueName: string, data: any) {
  const q = queueRegister.get(queueName);
  q.add(data);
  queueRegister.set(queueName, q);
}

export function listen(queueName: string, queueType: string) {
  return (target: any, pk: string) => {
    const q = queueRegister.get(queueName);
    q &&
      q.process(async (job: any) => {
        if (job.data.type !== queueType) return;
        return await target[pk](job);
      });
  };
}
