'use strict'

const path = require('path')
const Logtopus = require('./src/Logtopus')
const ConsoleLogger = require('./lib/consoleLogger')

const consoleLogger = new ConsoleLogger()
const superconf = require('superconf')
const superimport = require('superimport')

const debugEnabled = !!process.env.LOGTOPUS_DEBUG
if (debugEnabled) {
  console.log('[LOGTOPUS]', 'Configuration:', conf); // eslint-disable-line
}

const loggerStorage = {}

class LogtopusModule {
  static getInstance (conf) {
    const logtopus = new Logtopus(conf)
    return logtopus
  }

  /**
   * Gets a logger by its name. Creates a new instance if required
   *
   * @method  getLogger
   * @param   {str} name Logger name
   * @returns {obj} Returns a Logtopus instance. It always returns the same instance.
   */
  static getLogger (name) {
    if (!loggerStorage[name]) {
      const conf = superconf('logtopus') || {}
      loggerStorage[name] = new Logtopus(conf)
    }

    return loggerStorage[name]
  }

  /**
  * Returns an express middleware
  * @param  {object} conf Logger configuration
  * @return {function}      Returns a express/connect middleware
  */
  static express (conf) {
    return require('./src/plugins/expressLogger')(conf)
  }

  /**
  * Returns a koa middleware
  * @param  {object} conf Logger configuration
  * @return {function}      Returns a koa middleware
  */
  static koa (conf) {
    return require('./src/plugins/koaLogger')(conf)
  }
}

module.exports = LogtopusModule
module.exports.Logtopus = Logtopus

module.exports.XgetLogger = function (name) {
  if (!loggerStorage[name]) {
    let conf = superconf('logtopus') || {}

    loggerStorage[name] = new Logtopus(conf, name)
    loggerStorage[name].addLogger(consoleLogger)

    for (let loggerName of Object.keys(conf)) {
      if (debugEnabled) {
        console.log('[LOGTOPUS]', `Load ${loggerName} plugin`); // eslint-disable-line
      }

      if (loggerName === 'fileLogger' && conf.fileLogger.enabled === true) {
        let FileLogger = require('./lib/fileLogger')
        let fileLogger = new FileLogger(Object.assign({
          file: path.resolve(process.cwd(), conf.fileLogger.file)
        }, conf.fileLogger), name)

        loggerStorage[name].addLogger(fileLogger)
        continue
      }

      if (loggerName === 'consoleLogger') {
        continue
      }

      let Logger
      let moduleName
      try {
        moduleName = 'logtopus-' + loggerName.replace(/[A-Z]/g, match => '-' + match.toLowerCase())
        Logger = superimport(moduleName)
      } catch (err) {
        // ignore errors

        continue
      }

      let loggerInstance = new Logger(conf[loggerName], name)
      loggerStorage[name].addLogger(loggerInstance)
    }
  }

  return loggerStorage[name]
}

module.exports.flush = function () {
  let promises = []
  for (let logger in loggerStorage) {
    if (loggerStorage.hasOwnProperty(logger)) {
      promises = promises.concat(loggerStorage[logger].flush())
    }
  }

  return Promise.all(promises)
}
