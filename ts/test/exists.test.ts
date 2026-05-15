
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PonySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PonySDK.test()
    equal(null !== testsdk, true)
  })

})
