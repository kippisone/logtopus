'use strict'

const sinon = require('sinon')
const sandbox = sinon.sandbox.create()

const FakeLogger = function () {}

FakeLogger.prototype.log = sandbox.stub()
FakeLogger.prototype.write = sandbox.stub()
FakeLogger.prototype.flush = sandbox.spy(() => {
  return Promise.resolve()
})

FakeLogger.reset = () => {
  sandbox.reset()
}

module.exports = FakeLogger
