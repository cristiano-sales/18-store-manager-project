const sinon = require('sinon');
const { expect } = require("chai");
const ProductsModel = require("../../../models/Products");
const service = require('../../../services/Products');

describe('Search all products - Service', () => {
  describe('getAllProducts function', () => {

    const mockGetAll = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
      }
    ]

    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([mockGetAll]);
    });
    after(() => ProductsModel.getAll.restore());

    it('returns an object', async () => {
      const response = await service.getAllProducts();
      expect(response[0]).to.be.an('object');
      expect(response[1]).to.be.an('object');
      expect(response[2]).to.be.an('object');
    });
    it('testing object "length" ', async () => {
      const response = await service.getAllProducts();
      expect(response).to.length(3);
    });
  })
});
