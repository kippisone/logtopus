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

  timer(name) {
    if (!this.__timer[name]) {
      let timer = Date.now();
      this.__timer[name] = timer;
      return 0;
    }

    return Date.now() - this.__timer[name];
  }

  timerReset(name) {
    this.__timer[name] = {};
  }
}

module.exports = LogUtils;
