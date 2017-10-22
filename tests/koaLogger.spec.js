'use strict'

const co = require('co')
const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const logtopus = require('../')

describe('Koa.js plugin', () => {
  let fakeCtx
  let loggerStub
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    fakeCtx = {
      on: sandbox.stub(),
      removeListener: sandbox.stub(),
      status: 200,
      message: 'OK',
      length: 2,
      get: sandbox.stub(),
      method: 'GET',
      originalUrl: 'http://logtopus.com/test/',
      type: 'application/json'
    }

    loggerStub = sandbox.stub(logtopus.getLogger('koa'), 'writeLog')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('koa()', () => {
    it('returns a koa middleware', () => {
      inspect(logtopus).hasMethod('koa')
      inspect(logtopus.koa()).isGenerator()
    })

    it('logs a request', () => {
      const fn = logtopus.koa()
      inspect(fn).isGenerator()
      return co(fn.bind(fakeCtx, Promise.resolve())).then(() => {
        inspect(loggerStub).wasCalledTwice()
        inspect(loggerStub).wasCalledWith('req', sinon.match.string)
        inspect(loggerStub).wasCalledWith('res', sinon.match.string)
      })
    })
  })
})
