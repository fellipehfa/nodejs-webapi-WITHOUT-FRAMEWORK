import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
import { DEFAULT_HEADERS } from '../../src/util/util.js'

test('Hero Integration Teste Suite', async (t) => {
  const testPort = 9009

  // TODO: Bad practice because it mutates the environment
  process.env.PORT = testPort
  const { server } = await import('./../../src/index.js')

  const testServerAddress = `http://localhost:${testPort}/heroes`

  await t.test('it should be able to create a hero', async (t) => {
    const data = {
      name: 'Batman',
      age: 50,
      power: 'money',
    }

    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    assert.deepStrictEqual(
      request.headers.get('content-type'),
      'application/json',
      )
      
    assert.strictEqual(request.status, 201)
    
    const result = await request.json()
    assert.deepStrictEqual(
      result.success,
      'Hero created successfully!',
      'should return success message',
    )

    assert.ok(
      result.id.length > 30, 
      'should return id'
    )
  })

  await promisify(server.close.bind(server))()
})