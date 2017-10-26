const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const logtopus = require('../')

describe('Logtopus', () => {
  describe('module', () => {
    it('is a static class', () => {
      inspect(logtopus).isClass()
    })

    it('has a getInstance method', () => {
      inspect(logtopus).hasMethod('getInstance')
    })

    it('has a getLogger method', () => {
      inspect(logtopus).hasMethod('getLogger')
    })
  })

  describe('getInstance', () => {
    it('creates a logtopus instance', () => {
      const log = logtopus.getInstance()
      inspect(log).isObject()
      inspect(log).hasMethod('writeLog')
      inspect(log).hasKey('__logger')
    })

    it('has a default log level', () => {
      const log = logtopus.getInstance()
      inspect(log).hasKey('__logLevel')
      inspect(log).hasMethod('getLevel')
      inspect(log.getLevel()).isEql('sys')
    })

    it('has a console logger', () => {
      const log = logtopus.getInstance()
      inspect(log).hasKey('__logger')
      inspect(log.__logger).isInstanceOf(Map)
      inspect(log.__logger.size).isEql(2)
      inspect(log.__logger.get('console').constructor.name).isEql('ConsoleLogger')
    })

    it('has a file logger', () => {
      const log = logtopus.getInstance()
      inspect(log).hasKey('__logger')
      inspect(log.__logger).isInstanceOf(Map)
      inspect(log.__logger.size).isEql(2)
      inspect(log.__logger.get('file').constructor.name).isEql('FileLogger')
    })
  })

  describe('getLogger', () => {
    it('return a logger by its name', () => {
      const log = logtopus.getLogger('test')
      inspect(log).isInstanceOf(logtopus.Logtopus)
    })

    it('returns everytime the same instance if name is equal', () => {
      const log1 = logtopus.getLogger('test')
      const log2 = logtopus.getLogger('test')
      const log3 = logtopus.getLogger('foo')
      inspect(log1).isEqual(log2)
      inspect(log1).isNotEqual(log3)
    })
  })
})
