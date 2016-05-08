'use strict';

let inspect = require('inspect.js');
let sinon = require('sinon');
inspect.useSinon(sinon);

let logtopus = require('../logtopus');

describe.only('ExpressLogger', function() {
  describe('middleware', function() {
    it('Should return an express middleware', function() {
      inspect(logtopus.express()).isFunction();
    });
  });

  describe('call middleware', function() {
    let sandbox;
    let logStub;
    let logger;
    let onStub;
    let removeListenerStub;

    beforeEach(function() {
      logger = logtopus.getLogger('express');
      sandbox = sinon.sandbox.create();
      logStub = sandbox.stub();
      onStub = sandbox.stub();
      removeListenerStub = sandbox.stub();

      let fakeLogger = {
        log: logStub
      };

      logger.__logger = [fakeLogger];
      logger.setLevel('debug');
    });

    afterEach(function() {
      sandbox.restore();
    });


    it('Should log a GET request', function() {
      let fn = logtopus.express();

      fn({
        method: 'GET',
        originalUrl: '/foo/bla',
        get: function() {}
      }, {
        statusCode: 200,
        statusMessage: 'OK',
        on: onStub,
        removeListener: removeListenerStub,
        get: function() {}
      }, function() {});

      onStub.firstCall.yield();

      inspect(logStub).wasCalledTwice();
      inspect(logStub.firstCall.args[0]).hasProps({
        type: 'req',
        msg: sinon.match(/[a-z0-9]{6} GET \/foo\/bla/),
        data: []
      });

      inspect(logStub.secondCall.args[0]).hasProps({
        type: 'res',
        msg: sinon.match(/[a-z0-9]{6} 200 OK \(\d+ms\)/),
        data: []
      });
    });

  });
});
