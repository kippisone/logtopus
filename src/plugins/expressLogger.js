'use strict'

const supertime = require('supertime')

const logtopus = require('../../logtopus')
const cl = require('colorfy')
const log = logtopus.getLogger('express')
const uid = require('gen-uid')

module.exports = function (conf) {
  if (conf) {
    if (conf.logLevel) {
      log.setLevel(conf.logLevel)
    }
  }

  return function LogtopusExpressLogger (req, res, next) {
    req.requestId = req.requestId || uid.token(true).substr(0, 6)
    const timer = supertime.start()

    let reqLog = cl()
      .auto(req.requestId)
      .lime(req.method)
      .grey(req.originalUrl)
    log.req(reqLog)

    let logFn = function () {
      const parseTime = timer.stop()

      res.removeListener('finish', logFn)
      res.removeListener('close', logFn)
      res.removeListener('error', logFn)
      let resLog = cl().auto(req.requestId)

      // Status code
      if (res.statusCode > 499) {
        resLog.plum(res.statusCode)
      } else if (res.statusCode > 399) {
        resLog.fire(res.statusCode)
      } else {
        resLog.green(res.statusCode)
      }

      resLog.txt(res.statusMessage)
      resLog.lgrey(res.get('Content-Length') || 0)
      resLog.dgrey(res.get('Content-Type') || '')

      if (parseTime.time > 99999999) {
        resLog.grey('(').red('\b' + parseTime.toString()).grey(')')
      } else if (parseTime.time > 49999999) {
        resLog.grey('(').orange(parseTime.toString(), 'trim').grey(')')
      } else if (parseTime.time < 10000000) {
        resLog.grey('(').green(parseTime.toString(), 'trim').grey(')')
      }

      log.res(resLog)
    }

    res.on('finish', logFn)
    res.on('close', logFn)
    res.on('error', logFn)

    next()
  }
}
