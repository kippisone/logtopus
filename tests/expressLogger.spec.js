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
    fakeReq = {

    }

    fakeRes = {

    }

    sandbox = sinon.sandbox.create()
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
        inspect(loggerStub).wasCalledOnce()
        inspect(loggerStub).wasCalledWith('req', {})
        done()
      })
    })
  })
})
