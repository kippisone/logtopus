Logtopus
========

[![Build Status](https://travis-ci.org/Andifeind/logtopus-console-logger.svg?branch=develop)](https://travis-ci.org/Andifeind/logtopus)

Logtopus is a powerful logger for node.js with different transports

Built in logger:
* Console logger using [logtopus-console-logger](https://npmjs.org/packages/logtopus-console-logger)
* File logger using [logtopus-file-logger](https://npmjs.org/packages/logtopus-file-logger)

Additional logger:
* Redis logger see [logtopus-redis-logger](https://npmjs.org/packages/logtopus-redis-logger)
* InfluxDB logger use [logtopus-influx-logger](https://npmjs.org/packages/logtopus-influx-logger)
* MongoDB logger use [logtopus-mongo-logger](https://npmjs.org/packages/logtopus-mongo-logger)

## Usage

```js
let log = require('logtopus').getLogger('mylogger', loggerConf);
log.setLevel('sys');
log.config({
  console: {
    colors: true
  }
})

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

### Logger API

A `ConsoleLogger` instance knows two public methods. The `.log()` method is a syncron method, it adds a log statement. The logs will be written to `STDOUT` for all levels, or `STDERR` if log type is `error`

```js
const logger = new ConsoleLogger({

})

logger.log({
  type: 'info',
  msg: 'Log message',
  data: [
    123,
    { foo: 'bar' }
  ]
})
```
