'use strict';

let Logtopus = require('./lib/logtopus');
let ConsoleLogger = require('./lib/consoleLogger');

let consoleLogger = new ConsoleLogger();



let loggerStorage = {};
module.exports.getLogger = function(name) {
  if (!loggerStorage[name]) {
    loggerStorage[name] = new Logtopus();
    loggerStorage[name].addLogger(consoleLogger);
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
