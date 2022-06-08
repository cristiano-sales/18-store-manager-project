const sinon = require('sinon');
const { expect } = require("chai");
const SalesModel = require("../../../models/Sales");
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
