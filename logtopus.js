'use strict';

let path = require('path');
let Logtopus = require('./lib/logtopus');
let ConsoleLogger = require('./lib/consoleLogger');

let consoleLogger = new ConsoleLogger();
let superconf = require('superconf');
let conf = superconf('logtopus') || {};

if (process.env.LOGTOPUS_DEBUG) {
  console.log('[LOGTOPUS CONF]', conf);
}

let loggerStorage = {};
module.exports.getLogger = function(name) {
  if (!loggerStorage[name]) {
    loggerStorage[name] = new Logtopus(conf, name);
    loggerStorage[name].addLogger(consoleLogger);

    if (conf.fileLogger && conf.fileLogger.enabled === true) {
      let FileLogger = require('./lib/fileLogger');
      let fileLogger = new FileLogger(Object.assign({
        file: path.resolve(process.cwd(), conf.fileLogger.file)
      }, conf.fileLogger), name);

      loggerStorage[name].addLogger(fileLogger);
    }

    if (conf.redisLogger && conf.redisLogger.enabled === true) {
      let RedisLogger = require('./lib/redisLogger');
      let redisLogger = new RedisLogger(conf.redisLogger, name);

      loggerStorage[name].addLogger(redisLogger);
    }

    if (conf.influxLogger && conf.influxLogger.enabled === true) {
      let InfluxLogger = require('./lib/influxLogger');
      let influxLogger = new InfluxLogger(conf.influxLogger, name);

      loggerStorage[name].addLogger(influxLogger);
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


/**
* Returns an koa middleware
* @param  {object} conf Logger configuration
* @return {function}      Returns a koa middleware
*/
module.exports.koa = function(conf) {
  return require('./lib/plugins/koaLogger')(conf);
}

'use strict';

module.exports.flush = function() {
  let promises = [];
  for (let logger in loggerStorage) {
    if (loggerStorage.hasOwnProperty(logger)) {
      promises = promises.concat(loggerStorage[logger].flush());
    }
  }

  return Promise.all(promises);
};
