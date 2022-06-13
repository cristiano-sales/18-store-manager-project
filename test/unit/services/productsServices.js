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

describe('Search product by id', () => {

  before(() => {
    sinon.stub(ProductsModel, 'getById').resolves([
        {
          "id": 2,
          "name": "Traje de encolhimento",
          "quantity": 20
        }
     ]);
  });
  after(() => ProductsModel.getById.restore());

  describe('getById function', async () => {

    it('Id 2 object have correct keys', async () => {
      const [response] = await service.getProductById(2);
      expect(response).to.haveOwnProperty('id');
      expect(response).to.haveOwnProperty('name');
      expect(response).to.haveOwnProperty('quantity');
    });
    it('Check object values', async () => {
      const [response] = await service.getProductById(2);
      expect(response.id).to.equal(2);
      expect(response.name).to.equal('Traje de encolhimento');
      expect(response.quantity).to.equal(20);
    });
  });
});

describe('Put product', () => {

  describe('Products model empty', async () => {

  before(() => {
    sinon.stub(ProductsModel, 'getById').resolves();
  });
  after(() => ProductsModel.getById.restore());

    it('Return NULL', async () => {
      const response = await service.putProduct('name', 5, 1);
      expect(response).to.be.null;
    });
  });
});