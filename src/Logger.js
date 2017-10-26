class LogtopusLogger {
  constructor(conf) {
    // conf contains the logger conf
  }

  log(logmsg) {
    const date = logmsg.time.toISOString()
    console.log(`[${date}] ${logmsg.msg}`)
  }
}

module.exports = LogtopusLogger
