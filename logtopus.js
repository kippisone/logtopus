'use strict';

let path = require('path');
let Logtopus = require('./lib/logtopus');
let ConsoleLogger = require('./lib/consoleLogger');

let consoleLogger = new ConsoleLogger();
let superconf = require('superconf');
let conf = superconf('logtopus');


let loggerStorage = {};
module.exports.getLogger = function(name) {
  if (!loggerStorage[name]) {
    loggerStorage[name] = new Logtopus();
    loggerStorage[name].addLogger(consoleLogger);

    if (conf.fileLogger && conf.fileLogger.enabled === true) {
      let FileLogger = require('./lib/fileLogger');
      let fileLogger = new FileLogger({
        file: path.resolve(process.cwd(), conf.fileLogger.file)
      });

      loggerStorage[name].addLogger(fileLogger);
    }
  }

  return loggerStorage[name];
};

/**
* Returns an express/connect middleware
* @param  {object} conf Logger configuration
* @return {function}      Returns a express/connect middleware
*/
module.exports.express = function(conf) {
  return require('./lib/plugins/expressLogger')(conf);
}
