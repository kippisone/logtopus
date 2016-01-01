'use strict';

var ConsoleLogger = require('./lib/consoleLogger');

var consoleLogger = new ConsoleLogger();

var logtopus = function() {
    
};

logtopus.__logger = {};
logtopus.__logStr = [];
logtopus.__logData = [];

logtopus.__logLevels = {
    error: 1,
    warn: 2,
    sys: 3,
    req: 4,
    res: 5,
    info: 6,
    debug: 7
};

logtopus.__curLogLevel = 3;

/**
 * Add a logger
 *
 * @method addLogger
 * @param {Object} logger Logger Object
 */
logtopus.addLogger = function(logger) {
    if (logger.name && !this.__logger[logger.name]) {
        this.__logger[logger.name] = logger;
    }
};

/**
 * Remove a logger
 *
 * @method removeLogger
 * @param {String} loggerName Logger name
 */
logtopus.removeLogger = function(loggerName) {
    if (loggerName && this.__logger[loggerName]) {
        delete this.__logger[loggerName];
    }   
};

/**
 * Set a message
 *
 * @method msg
 * @chainable
 * @param {String} styles Message style options (Optional)
 * @param {String} msg Message
 */
logtopus.msg = function(styles, msg) {
    if (arguments.length === 1) {
        this.__logStr.push([null, styles]);
    }
    else {
        this.__logStr.push([styles, msg]);
    }

    return this;
};

/**
 * Set data
 *
 * @method data
 * @chainable
 * @param {Object} data Data
 */
logtopus.data = function(data) {
    this.__logData.push(data);
    return this;
};

logtopus.dataArr = function(args) {
    args.forEach(function(data) {
        this.__logData.push(data);
    }, this);
    return this;
};

/**
 * Sends a log to all logger
 *
 * @method log
 * @param {String} type Loging type
 */
logtopus.log = function(type) {
    if (typeof type === 'undefined') {
        type = 'info';
    }

    //Check log level
    var curLevel = this.__logLevels[type];
    if (!curLevel) {
        curLevel = this.__logLevels.info;
        level = 'info';
    }
    
    if (curLevel && curLevel <= this.__curLogLevel) {
        for (var key in this.__logger) {
            var loggerObj = this.__logger[key];
            loggerObj.log(type, this.__logStr, this.__logData);
        }
    }

    this.__logStr = [];
    this.__logData = [];
};

logtopus.debug = function(msg, data) {
    if (arguments.length >= 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('debug');
    }
    else {
        this.msg(msg).log('debug');
    }
};

logtopus.req = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('req');
    }
    else {
        this.msg(msg).log('req');
    }
};

logtopus.res = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('res');
    }
    else {
        this.msg(msg).log('res');
    }
};

logtopus.warning = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('warn');
    }
    else {
        this.msg(msg).log('warn');
    }
};

logtopus.error = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('error');
    }
    else {
        this.msg(msg).log('error');
    }
};

logtopus.info = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('info');
    }
    else {
        this.msg(msg).log('info');
    }
};

logtopus.system = function(msg, data) {
    if (arguments.length === 2) {
        this.msg(msg).dataArr(Array.prototype.slice.call(arguments, 1)).log('sys');
    }
    else {
        this.msg(msg).log('sys');
    }
};

//Aliases
logtopus.dev = logtopus.debug;
logtopus.err = logtopus.error;
logtopus.sys = logtopus.system;
logtopus.warn = logtopus.warning;

logtopus.help = function() {
    console.log(
        'Logtopus help\n' +
        '\n' +
        'logger.commad("Message", { "Optional Data": "Pretty printed" });\n' +
        '\n' +
        'Commands:\n' +
        '  dev, debug Prints a debug message\n' +
        '  req        Prints a request message\n' +
        '  res        Prints a response message\n' +
        '  log, info  Prints a log message\n' +
        '  warn       Prints a warning\n' +
        '  err, error Prints an error\n' +
        '  data       Prints a readable object\n' +
        '\n' +
        'Make a colorized message with color codes\n' +
        'logger.info("My #yellow[colorized] message");\n' +
        '\n' +
        'Color codes:\n' +
        '  black, red, green, yellow,\n' +
        '  blue, magenta, cyan, white\n' +
        '  bold, italic, underline, blink\n' +
        '  reset\n' +
        '\n' +
        '\n' +
        '\n'
    );
};

/**
 * Set log level
 */
logtopus.setLevel = function(level) {
    this.__curLogLevel = this.__logLevels[level] || this.__logLevels.info;
};

/**
 * Get current log level
 * @method getLevel
 * @returns {String} Returns current log level
 */
logtopus.getLevel = function() {
    for (var key in this.__logLevels) {
        if (this.__logLevels[key] === this.__curLogLevel) {
            return key;
        }
    }
};

/**
 * Express middleware
 */
logtopus.__express = function(req, res, next) {
    var startTime = Date.now();

    var LogIt = function() {
        res.removeListener('finish', LogIt);
        res.removeListener('close', LogIt);
        res.removeListener('error', LogIt);

        var reqLog = logger.msg(req.method + ' ' + req.path),
            dataLog;

        //Status code
        var statusCodeColor = 'dgrey';
        if (res.statusCode >= 400) {
            statusCodeColor = 'red';
        }

        reqLog.msg('grey', ' - ');
        reqLog.msg(statusCodeColor, res.statusCode);

        //Calculate parse time
        var parseTime = Date.now() - startTime,
            parseTimeColor = 'grey';

        if (parseTime > 99) {
            parseTimeColor = 'red';
        }
        else if (parseTime > 49) {
            parseTimeColor = 'orange';
        }

        reqLog.msg(parseTimeColor, ' (' + parseTime + 'ms)');

        if (req.body) {
            dataLog = req.body;
            reqLog.data(dataLog).log('req');
        }
        else {
            reqLog.log('req');
        }
    };

    res.on('finish', LogIt);
    res.on('close', LogIt);
    res.on('error', LogIt);

    next();
};

logtopus.addLogger(consoleLogger);

module.exports = logtopus;
