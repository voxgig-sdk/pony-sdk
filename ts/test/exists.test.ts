
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PonySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PonySDK.test()
    equal(testsdk instanceof PonySDK, true,
      'PonySDK.test() must return a client synchronously')
  })

})
