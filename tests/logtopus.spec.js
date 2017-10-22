const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const Logtopus = require('../src/Logtopus')
const FakeLogger = require('./fixtures/fakeLogger')

describe('Logtopus', () => {
  beforeEach(() => {
    FakeLogger.reset()
  })

  describe('writeLog()', () => {
    it('writes a log', () => {
      const logger = new Logtopus({})
      logger.setLevel('info')
      const fakeLogger = new FakeLogger()
      logger.addLogger(fakeLogger)

      logger.writeLog('info', 'Test log')
      inspect(fakeLogger.log).wasCalledOnce()
      inspect(fakeLogger.log).wasCalledWith({
        type: 'info',
        msg: 'Test log',
        cmsg: 'Test log',
        data: [],
        time: sinon.match.date,
        uptime: sinon.match.number
      })
    })

    it('writes a colorized log', () => {
      const logger = new Logtopus({})
      logger.setLevel('info')
      const fakeLogger = new FakeLogger()
      logger.addLogger(fakeLogger)

      logger.writeLog('sys', 'Listening on port: \u001b[38;5;154m3000\u001b[m')
      inspect(fakeLogger.log).wasCalledOnce()
      inspect(fakeLogger.log).wasCalledWith({
        type: 'sys',
        msg: 'Listening on port: 3000',
        cmsg: 'Listening on port: \u001b[38;5;154m3000\u001b[m',
        data: [],
        time: sinon.match.date,
        uptime: sinon.match.number
      })
    })
  })
})
