'use strict';

const expect = require('chai').expect;
const supertest = require('supertest');
const queryString = require('query-string');
const app = require('../test/index');

let request = supertest(app);

describe('handler module', () => {
  const rest = {
    pageNumber: 1,
    pageSize: 10
  };

  it('should returns records with population between 1000 and 1500 people hitting the endpoint with GET to /endpoint', async (done) => {
    let filters = queryString.stringify({
      ...rest,
      from: 1000,
      to: 1500
    });
    const response = await request.get(`/test?${filters}`).send();
    let results = response.body;
    const firstWrongRange = results.some((record) => record.population < 1000);
    const secondWrongRange = results.some((record) => record.population > 1500);
    expect(firstWrongRange).to.be.false;
    expect(secondWrongRange).to.be.false;
    done();
  });
});
