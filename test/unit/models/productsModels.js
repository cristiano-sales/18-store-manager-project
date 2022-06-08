const sinon = require('sinon');
const { expect } = require("chai");
const { getAll, getById } = require("../../../models/Products");
const connection = require('../../../models/connection');

describe('Search all products', () => {
  describe('When there are no products', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => connection.execute.restore());

    it('returns an array', async () => {
      const [response] = await getAll();
      expect(response).to.be.an('array');
    });
    it('array is empty', async () => {
      const [response] = await getAll();
      expect(response).to.be.empty;
    });
  })
});

describe('Search product by id', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([[
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }
     ]]);
  });
  after(() => connection.execute.restore());

  describe('getById function', async () => {

    it('Id 2 object have correct keys', async () => {
      const response = await getById(2);
      expect(response).to.haveOwnProperty('id');
      expect(response).to.haveOwnProperty('name');
      expect(response).to.haveOwnProperty('quantity');
    });
    it('Check object values', async () => {
      const response = await getById(2);
      expect(response.id).to.equal(2);
      expect(response.name).to.equal('Traje de encolhimento');
      expect(response.quantity).to.equal(20);
    });
  });
});
