Logtopus
========

[![Build Status](https://travis-ci.org/Andifeind/logtopus-console-logger.svg?branch=develop)](https://travis-ci.org/Andifeind/logtopus)

Logtopus is a powerful logger for Node.js with different transports

Built in logger:
* Console logger using [logtopus-console-logger](https://npmjs.org/packages/logtopus-console-logger)
* File logger using [logtopus-file-logger](https://npmjs.org/packages/logtopus-file-logger)

Additional logger:
* Redis logger see [logtopus-redis-logger](https://npmjs.org/packages/logtopus-redis-logger)
* InfluxDB logger use [logtopus-influx-logger](https://npmjs.org/packages/logtopus-influx-logger)
* MongoDB logger use [logtopus-mongo-logger](https://npmjs.org/packages/logtopus-mongo-logger)

## Usage

```js
const log = require('logtopus').getLogger('mylogger');
log.setLevel('sys');

log.warn('My beer is nearly finish!');
```

### Log levels

    debug    development  Logs debugging informations
    info     development  Helpful during development
    res      staging      Logs requests
    req      staging      Logs responses
    sys      production   Logs application states
    warn     production   Logs warnings
    error    production   Logs errors

For example, setting log level to `req` includes these log levels: `req`, `sys`, `warn`, `error`
Setting log level to `debug` means all log levels are activated
log level `error` logs errors only.

Example:

```js
log.setLevel('res');        // To be ignored in this log level
log.debug('Log example:');  // To be ignored in this log level
log.info('This would not be logged');
log.res('POST /account');
log.req('200 OK');
log.sys('Request done!');
log.warn('Request was unauthorized!');
log.error('An error has been occurred!');

// prints

res: POST /account
req: 200 OK
sys: Request done!
warn: Request was unauthorized!
error: An error has been occurred!
```

### Express logger

Logtopus comes with a logger for Express/Connect.

`logtopus.express()` returns a middleware for Express/Connect. It acepts an optional options object

```
let express = require('express');
let logtopus = require('../logtopus');

let app = express();

app.use(logtopus.express({
  logLevel: 'debug'
}));
```

#### Options

`logLevel` Sets current log level


### Koa logger

Logtopus also supports Koa

`logtopus.koa()` returns a middleware for Koa. It acepts an optional options object

```
let koa = require('koa');
let logtopus = require('../logtopus');

let app = koa();

app.use(logtopus.koa({
  logLevel: 'debug'
}));
```

#### Options

`logLevel` Sets current log level

### Adding custom loggers

Logtopus was designed as an extensible logger. You can add a custom logger by creating a logger class and load it into logtopus. The example below shows a minimal logger class.

```js
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
```

The logger class requires a log method. It takes one argument which contains a log object. The first argument of a log call is the log message, all other arguments are log data.

```js
logmsg: {
  type: 'info', // The logtype eg: debug, info, error, sys
  msg: 'Log message string', // Log message, but without CLI color codes
  cmsg: 'Colorized log message', // Log message with CLI color codes
  time: new Date(), // Current date
  uptime: process.uptime(), // Process uptime in ms
  data: [] // All other arguments as an array
}
```

Now, the class has to be load into logtopus. You can do it by using the .addLogger() method if your logger is a priveate logger. Otherwis publish it on npm by using our logger name conventions. `logtopus-${loggername}-logger`
Add a new config block into the logtopus config by using `loggername` as namespace and logtopus tries to load the logger.

```js
const log = logtopus.getLogger('mylogger')
log.addLogger('loggerName', loggerClass)
```
