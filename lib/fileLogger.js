'use strict';

let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

class FileLogger {
  constructor(conf) {
    conf = conf || {};

    this.file = conf.file || path.join(process.cwd(), 'log/logtopus.log');
    mkdirp(path.dirname(this.file));
  }

  log(msg) {
    let date = new Date();
    date = date.toISOString();

    let message = `[${date}] ${msg.type}: ${this.escape(msg.msg)}`;
    let data;

    if (msg.data) {
      data = msg.data.map(data => {
        if (typeof data === 'object') {
          return JSON.stringify(data);
        }

        return this.escape(String(data));
      }).join('\n');
    }

    if (data) {
      message += '\n' + data;
    }

    fs.appendFile(this.file, message + '\n');
  }

  escape(str) {
    return str.replace(/[\0\n\r\v\t\b\f]/g, '\\$&');
  }
}

module.exports = FileLogger;
