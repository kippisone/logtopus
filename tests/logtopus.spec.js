'use strict';

let sinon = require('sinon');
let inspect = require('inspect.js');
let Logtopus = require('../lib/logtopus');

inspect.useSinon(sinon);
process.chdir(__dirname + '/fixtures');

describe('Logtopus', function() {
  describe('Instance', function() {
    it('Should be a Logtopus class', function() {
      inspect(Logtopus).isClass();
    });
  });

  describe('getConf', function() {
    let logtopus = new Logtopus();

    it('Should load logtopus configuration', function() {
      let conf = logtopus.getConf();
      inspect(conf).isObject();
      inspect(conf).hasProps({
        logLevel: 'debug'
      });
    });
  });

  describe('logLevel', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
    });

    it('Should set a new log level', function() {
      inspect(logtopus.setLevel).isFunction();

      logtopus.setLevel('warn');
      inspect(logtopus.__logLevel).isEql(2);
    });

    it('Should not set a log level without level param', function() {
      logtopus.__logLevel = 2;
      logtopus.__environmentDefault = 1;
      logtopus.setLevel();
      inspect(logtopus.__logLevel).isEql(1);
    });

    it('Should result in an error when level param is wrong', function() {
      inspect(logtopus.setLevel).withArgsOn(logtopus, 'fake').doesThrow(/Invalid log level/);
    });
  });

  describe('getLevel', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
    });

    it('Should get current loglevel', function() {
      logtopus.setLevel('res');
      inspect(logtopus.getLevel()).isEql('res');
    });

    it('Should get current loglevel if default level is set', function() {
      logtopus.__environmentDefault = 1;
      logtopus.setLevel();
      inspect(logtopus.getLevel()).isEql('error');
    });
  });

  describe('addLogger', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
    });

    it('Should add a logger', function() {
      let logger = {};
      logtopus.addLogger(logger);
      inspect(logtopus.__logger).isArray();
      inspect(logtopus.__logger).hasLength(1);
      inspect(logtopus.__logger[0]).isEql(logger);
    });

    it('Should not add a logger twice', function() {
      let logger = {};
      logtopus.addLogger(logger);
      logtopus.addLogger(logger);
      inspect(logtopus.__logger).isArray();
      inspect(logtopus.__logger).hasLength(1);
      inspect(logtopus.__logger[0]).isEql(logger);
    });
  });

  describe('removeLogger', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
    });

    it('Should remove a logger', function() {
      let logger = {};
      let logger2 = {};
      logtopus.__logger = [logger, logger2];

      logtopus.removeLogger(logger);
      inspect(logtopus.__logger).isArray();
      inspect(logtopus.__logger).hasLength(1);
      inspect(logtopus.__logger[0]).isEql(logger2);
    });
  });

  describe('writeLog', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
    });

    it('Should remove a logger', function() {
      let logger = {
        log: sinon.stub()
      };

      let logger2 = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger, logger2];

      logtopus.writeLog('test', 'Test message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger2.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'test',
        msg: 'Test message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });

      inspect(logger2.log).wasCalledWith({
        type: 'test',
        msg: 'Test message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });
  });

  describe('debug', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('debug');
    });

    it('Should write a debug log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.debug('Debug message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'debug',
        msg: 'Debug message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a debug log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.debug('Debug message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('info', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('info');
    });

    it('Should write a info log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.info('Info message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'info',
        msg: 'Info message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a info log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.info('Info message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('res', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('res');
    });

    it('Should write a res log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.res('Response message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'res',
        msg: 'Response message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a res log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.res('Response message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('req', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('req');
    });

    it('Should write a req log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.req('Request message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'req',
        msg: 'Request message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a req log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.req('Request message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('sys', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('sys');
    });

    it('Should write a sys log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.sys('System log message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'sys',
        msg: 'System log message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a sys log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.sys('System log message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('warn', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('warn');
    });

    it('Should write a warn log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.warn('Warning message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'warn',
        msg: 'Warning message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a warn log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.warn('Warning message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });

  describe('error', function() {
    let logtopus;

    beforeEach(function() {
      logtopus = new Logtopus();
      logtopus.setLevel('error');
    });

    it('Should write a error log', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.error('Error message', { foo: 'bar' });
      inspect(logger.log).wasCalledOnce();
      inspect(logger.log).wasCalledWith({
        type: 'error',
        msg: 'Error message',
        data: [{ foo: 'bar' }],
        time: sinon.match.number,
        uptime: sinon.match.number
      });
    });

    it('Should not write a error log if level is to low', function() {
      let logger = {
        log: sinon.stub()
      };

      logtopus.__logger = [logger];
      logtopus.__logLevel = 0;
      logtopus.error('Error message', { foo: 'bar' });
      inspect(logger.log).wasNotCalled();
    });
  });
});
