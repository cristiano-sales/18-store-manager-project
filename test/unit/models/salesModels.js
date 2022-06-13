const sinon = require('sinon');
const { expect } = require("chai");
const { getAll, getById, postSale } = require("../../../models/Sales");
const connection = require('../../../models/connection');

describe('Search all Sales', () => {
  describe('When there are no sales', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => connection.execute.restore());

    it('returns an array;', async () => {
      const response = await getAll();
      expect(response).to.be.an('array');
    });
    it('array is empty;', async () => {
      const response = await getAll();
      expect(response).to.be.empty;
    });
  })
});


describe('Search Sale by id', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([[
      {
        "date": "2022-06-01T18:49:50.000Z",
        "productId": 1,
        "quantity": 5
      },
      {
        "date": "2022-06-01T18:49:50.000Z",
        "productId": 2,
        "quantity": 10
      }
    ]]);
  });
  after(() => connection.execute.restore());

  describe('getById function', async () => {

    it('Id 1 object have correct keys', async () => {
      const [response] = await getById(1);
      expect(response).to.haveOwnProperty('date');
      expect(response).to.haveOwnProperty('productId');
      expect(response).to.haveOwnProperty('quantity');
    });
    it('Check object values', async () => {
      const [response] = await getById(1);
      expect(response.date).to.equal("2022-06-01T18:49:50.000Z");
      expect(response.productId).to.equal(1);
      expect(response.quantity).to.equal(5);

    });
  });
});

describe('Post sale', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
  });
  after(() => connection.execute.restore());

  it('check insert Id', async () => {
      const insertId = await postSale();
      expect(insertId).to.equal(1);
  });

  it('Check type', async () => {
    const result = await postSale();
    expect(result).to.be.an('number');
});
});
