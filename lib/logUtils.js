'use strict';

class LogUtils {
  constructor() {
    this.__counter = {};
    this.__timer = {};
  }

  count(name) {
    if (!this.__counter[name]) {
      this.__counter[name] = {};
    }

    return ++this.__counter[name];
  }

  counterReset(name) {
    this.__counter[name] = {};
  }

  static timer() {
    let prettyTime = require('pretty-time');
    return {
      stop: function() {
        return prettyTime(process.hrtime(this.hrtime));
      },
      reset: function() {
        this.hrtime = process.hrtime();
      },
      hrtime: process.hrtime()
    };
  }
}

module.exports = LogUtils;
