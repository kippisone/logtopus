let ConsoleLogger = require('./lib/consoleLogger');
let consoleLogger = new ConsoleLogger();

/**
 * Creates a new logtopus instance
 *
 * ## Conf
 * ```js
 * logLevel: <number> // Defines a loglevel
 * ```
 */
class Logtopus {
  constructor(conf) {
    this.__logLevel = conf.logLevel || 3;
  }
}
