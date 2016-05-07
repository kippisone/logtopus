'use strict';

let sinon = require('sinon');
let inspect = require('inspect.js');
let ConsoleLogger = require('../lib/consoleLogger');
inspect.useSinon(sinon);

describe('ConsoleLogger', function() {
  describe('Instance', function() {
    it('Should be a ConsoleLogger class', function() {
      inspect(ConsoleLogger).isClass();
    });
  });

  describe('log', function() {
    it('Should log a info message to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'info',
        msg: 'Info Message'
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/info.+: Info Message/);

      writeStub.restore();
    });

    it('Should log a info message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'info',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/info.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a info message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'info',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/info.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a debug message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'debug',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/debug.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a debug message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'debug',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/debug.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a res message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'res',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/res.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a res message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'res',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/res.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a req message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'req',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/req.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a req message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'req',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/req.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a sys message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'sys',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/sys.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a sys message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'sys',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/sys.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a warn message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'warn',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/warn.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a warn message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'warn',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/warn.+: Info Message.+123.+345/);

      writeStub.restore();
    });

    it('Should log a error message with args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'error',
        msg: 'Info Message',
        data: [123]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/error.+: Info Message.+123/);

      writeStub.restore();
    });

    it('Should log a error message with two args to the console', function() {
      let consoleLogger = new ConsoleLogger();
      let writeStub = sinon.stub(consoleLogger, 'write');

      consoleLogger.log({
        type: 'error',
        msg: 'Info Message',
        data: [123, 345]
      });

      inspect(writeStub).wasCalledOnce();
      inspect(writeStub).wasCalledWithMatch(/error.+: Info Message.+123.+345/);

      writeStub.restore();
    });
  });
});
