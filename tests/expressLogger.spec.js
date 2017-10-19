'use strict'

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const logtopus = require('../')

describe('Express plugin', () => {
  let fakeReq
  let fakeRes
  let loggerStub
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    fakeReq = {

    }

    fakeRes = {
      on: sandbox.stub(),
      removeListener: sandbox.stub(),
      statusCode: 200,
      statusMessage: 'OK',
      get: sandbox.stub()
    }

    fakeRes.get.withArgs('Content-Type').returns('application/json')
    fakeRes.get.withArgs('Content-Length').returns('2')
    loggerStub = sandbox.stub(logtopus.getLogger('express'), 'writeLog')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('express()', () => {
    it('returns a express middleware', () => {
      inspect(logtopus).hasMethod('express')
      inspect(logtopus.express()).isFunction()
    })

    it('logs a request', (done) => {
      const fn = logtopus.express()
      fn(fakeReq, fakeRes, () => {
        fakeRes.on.firstCall.yield()
        inspect(loggerStub).wasCalledOnce()
        inspect(loggerStub).wasCalledWith('req', {})
        done()
      })
    })
  })
})
