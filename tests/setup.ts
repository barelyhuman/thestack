import { afterEach, beforeEach, vi } from 'vitest'
import Redis from 'ioredis-mock'

beforeEach(() => {
  vi.clearAllMocks()
  vi.mock('ioredis', async () => {
    // const mod = await vi.importActual('ioredis')
    const mock = await vi.importActual('ioredis-mock')
    return {
      // @ts-expect-error untyped import
      Redis: mock.default,
    }
  })
})

afterEach(async () => {
  await new Redis().flushall()
})
