'use strict';

const expect = require('chai').expect;

const handler = require('../test/handler');

describe('handler module', () => {
  describe('handler module: Search', () => {
    it('function exists', (done) => {
      expect(handler.search).to.exist;
      done();
    });
  });
});
