import http from 'http'
import { initApp } from '../src/app'
import { describe, expect, it, beforeAll } from 'vitest'
import { db } from '../src/lib/db'
import listen from 'test-listen'
import axios from 'axios'

let tCtx: any = {}

beforeAll(async () => {
  tCtx.server = http.createServer(initApp({ db }))
  tCtx.prefixUrl = await listen(tCtx.server)
  const $fetcher = axios.create({
    baseURL: tCtx.prefixUrl,
  })
  tCtx.fetcher = $fetcher
})

describe('Ping', () => {
  it('should get value from ping', async () => {
    const result = await tCtx.fetcher.get('/api/ping')
    expect(Object.keys(result.data)).toMatchInlineSnapshot(`
      [
        "success",
        "now",
      ]
    `)
  })
})
