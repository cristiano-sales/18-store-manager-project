const sinon = require('sinon');
const { expect } = require("chai");
const SalesModel = require("../../../models/Sales");
const Products = require("../../../models/Products")
const service = require('../../../services/Sales');

describe('Search all Sales - Service', () => {
  describe('getAllSales function', () => {

    const mockGetAll = [
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 5,
        "date": "2022-06-01T18:55:39.000Z"
      },
      {
        "saleId": 1,
        "productId": 2,
        "quantity": 10,
        "date": "2022-06-01T18:55:39.000Z"
      },
      {
        "saleId": 2,
        "productId": 3,
        "quantity": 15,
        "date": "2022-06-01T18:55:39.000Z"
      }
    ]

    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves(mockGetAll);
    });
    after(() => SalesModel.getAll.restore());

    it('returns an object', async () => {
      const response = await service.getAllSales();
      expect(response[0]).to.be.an('object');
      expect(response[1]).to.be.an('object');
      expect(response[2]).to.be.an('object');
    });
    it('testing object "length" ', async () => {
      const response = await service.getAllSales();
      expect(response).to.length(3);
    });
    it('testing object keys', async () => {
      const [response] = await service.getAllSales();

      expect(response).to.haveOwnProperty('saleId');
      expect(response).to.haveOwnProperty('productId');
      expect(response).to.haveOwnProperty('quantity');
      expect(response).to.haveOwnProperty('date');
    })
  })
});

describe('Put Sale', () => {

  describe('Sale empty', async () => {

  before(() => {
    sinon.stub(SalesModel, 'putSale').resolves([]);
  });
  after(() => SalesModel.putSale.restore());

    it('To be an object', async () => {
      const result = await service.putSale([], 1);
      expect(result).to.be.an('object');
    });

    it('Return 0 items', async () => {
      const result = await service.putSale([], 1);
      expect(result.saleId).to.be.equal(1);
      expect(result.itemUpdated).to.be.an('array');
      expect(result.itemUpdated).to.be.empty;
    });
  });
});

describe('delete Sale', () => {

  describe('Sale empty', async () => {

  before(() => {
    sinon.stub(SalesModel, 'getById').resolves([]);
  });
  after(() => SalesModel.getById.restore());

    it('Return null', async () => {
      const result = await service.deleteSale(1);
      expect(result).to.be.null;
    });
  });
});

describe('Post Sale', () => {

  describe('Sale empty', async () => {

  before(() => {
    sinon.stub(Products, 'getById').resolves({ quantity: 5 });
  });
  after(() => Products.getById.restore());

    it('Return an object', async () => {
      const result = await service.postSale([{ quantity: 12 }]);
      expect(result.error).to.be.an("boolean")
    });

    it('Return an error', async () => {
      const result = await service.postSale([{ quantity: 12 }]);
      expect(result.error).to.be.equal(true);
    });
  });
});
