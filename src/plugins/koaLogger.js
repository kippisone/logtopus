'use strict'

const supertime = require('supertime')

const logtopus = require('../../logtopus')
const cl = require('colorfy')
const log = logtopus.getLogger('koa')
const uid = require('gen-uid')

module.exports = function (conf) {
  conf = conf || {}
  if (conf.logLevel) {
    log.setLevel(conf.logLevel)
  }

  return function * LogtopusKoaLogger (next) {
    this.requestId = this.requestId || uid.token(true).substr(0, 6)
    const timer = supertime.start()

    let reqLog = cl()
      .auto(this.requestId)
      .lime(this.method)
      .grey(this.originalUrl)
    log.req(reqLog.colorfy(!!conf.colors))

    yield next

    const parseTime = timer.stop()
    let resLog = cl().auto(this.requestId)

    // Status code
    if (this.status > 499) {
      resLog.plum(this.status)
    } else if (this.status > 399) {
      resLog.fire(this.status)
    } else {
      resLog.green(this.status)
    }

    resLog.txt(this.message)
    resLog.lgrey(this.length || 0)
    resLog.dgrey(this.type || '')

    if (parseTime.time > 99999999) {
      resLog.grey('(').red('\b' + parseTime.toString()).grey(')')
    } else if (parseTime.time > 49999999) {
      resLog.grey('(').orange(parseTime.toString(), 'trim').grey(')')
    } else if (parseTime.time < 10000000) {
      resLog.grey('(').green(parseTime.toString(), 'trim').grey(')')
    }

    log.res(resLog.colorfy(!!conf.colors))
  }
}
