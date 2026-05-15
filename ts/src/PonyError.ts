
import { Context } from './Context'


class PonyError extends Error {

  isPonyError = true

  sdk = 'Pony'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PonyError
}

