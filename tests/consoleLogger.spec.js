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
  });
});
