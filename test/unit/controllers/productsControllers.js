const sinon = require('sinon');
const { expect } = require("chai");

const ProductsController = require("../../../controllers/Products");
const service = require('../../../services/Products');

const response = {};
const request = {};

describe('Search all products - Controller', () => {
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
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(service, 'getAllProducts').resolves(mockGetAll);
    });
    after(() => service.getAllProducts.restore());
    it('return status 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('return all products', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(mockGetAll)).to.be.equal(true);
    });
  })
  describe('getAll with 0 products in DataBase', () => {
    const mockGetAll = []
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(service, 'getAllProducts').resolves(mockGetAll);
    });
    after(() => service.getAllProducts.restore());
    it('return status 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('return an empty array', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  })
});
