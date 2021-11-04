'use strict';

const expect = require('chai').expect;

const handler = require('../test/handler');

describe('handler module', () => {
  const rest = {
    pageNumber: 1,
    pageSize: 10
  };

  const ascOrderExpected = [
    'Hong Kong',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Israel',
    'Japan',
    'Jordan',
    'Kazakhstan',
    "Korea (Democratic People's Republic of)"
  ];

  const descOrderExpected = [
    'Yemen',
    'Viet Nam',
    'Uzbekistan',
    'United Arab Emirates',
    'Turkmenistan',
    'Turkey',
    'Timor-Leste',
    'Thailand',
    'Tajikistan',
    'Taiwan'
  ];

  describe('handler module: Search', () => {
    it('should returns an array', async (done) => {
      const results = await handler.search({
        ...rest
      });

      expect(Array.isArray(results)).to.be.true;
      done();
    });

    it('should returns records with population between 1000 and 1500 people', async (done) => {
      const results = await handler.search({
        ...rest,
        from: 1000,
        to: 1500
      });

      const firstWrongRange = results.some(
        (record) => record.population < 1000
      );
      const secondWrongRange = results.some(
        (record) => record.population > 1500
      );
      expect(firstWrongRange).to.be.false;
      expect(secondWrongRange).to.be.false;
      done();
    });

    it(`should returns ${descOrderExpected.join()} in the same order when sort by name is specified as desc`, async (done) => {
      const region = 'Asia';
      const results = await handler.search({
        ...rest,
        region,
        sort: {
          name: 'desc'
        }
      });

      expect(results.length === descOrderExpected.length).to.be.true;

      //must follow the same order
      expect(results[0].name).to.be.equal(descOrderExpected[0]);
      expect(results[1].name).to.be.equal(descOrderExpected[1]);
      expect(results[2].name).to.be.equal(descOrderExpected[2]);
      expect(results[3].name).to.be.equal(descOrderExpected[3]);
      expect(results[4].name).to.be.equal(descOrderExpected[4]);
      expect(results[5].name).to.be.equal(descOrderExpected[5]);
      expect(results[6].name).to.be.equal(descOrderExpected[6]);
      expect(results[7].name).to.be.equal(descOrderExpected[7]);
      expect(results[8].name).to.be.equal(descOrderExpected[8]);
      expect(results[9].name).to.be.equal(descOrderExpected[9]);

      //must be all in the right region
      expect(results[0].region).to.be.equal(region);
      expect(results[1].region).to.be.equal(region);
      expect(results[2].region).to.be.equal(region);
      expect(results[3].region).to.be.equal(region);
      expect(results[4].region).to.be.equal(region);
      expect(results[5].region).to.be.equal(region);
      expect(results[6].region).to.be.equal(region);
      expect(results[7].region).to.be.equal(region);
      expect(results[8].region).to.be.equal(region);
      expect(results[9].region).to.be.equal(region);

      done();
    });
  });
});
