import test from 'node:test'
import assert from 'node:assert'
const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

import { routes } from '../../../src/routes/heroRoute.js'
import { DEFAULT_HEADERS } from '../../../src/util/util.js'

test('Hero routes - endpoints test suite', async (t) => {
  await t.todo('it should call /heroes:get route', async (t) => {
    const databaseMock = [{
      "id": "319d48b6-8548-40f2-b6f8-9208ea826cb4",
      "name": "Batman",
      "age": 50,
      "power": "money"
    }]

    const heroServiceMock = {
      find: async () => stubResult,
    }

    const endpoints = routes({
      heroService: heroServiceMock,
    })

    const endpoint = '/heroes:get'
    const request = {}
    const response = {
      write: callTracker.calls(item => {
        const expected = JSON.stringify({
          result: databaseMock
        })
        assert.strictEqual(
          item,
          expected,
          'The response should be called with the correct payload'
        )
      }),
      end: callTracker.calls(item => {
        assert.strictEqual(
          item,
          undefined,
          'The response should be called without any parameters'
        )
      }),
    }
    const route = endpoints[endpoint]
    await route(request, response)
  })
  await t.todo('it should call /heroes:post route')
}) 