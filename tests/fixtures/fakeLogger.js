'use strict'

const sinon = require('sinon')
const sandbox = sinon.createSandbox()

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
