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

describe('getProductById', () => {

  const mockGetAll = [[
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20
    }
 ]]

  before(() => {

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    request.params = 2;

    sinon.stub(service, 'getProductById').resolves(mockGetAll);
  });
  after(() => service.getProductById.restore());

  it('return status 200', async () => {
    await ProductsController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('return array with one object', async () => {
    await ProductsController.getById(request, response);
    expect(response.json.calledWith(mockGetAll)).to.be.equal(true);
  });

  it('NOT return status 404', async () => {
    await ProductsController.getById(request, response);
    expect(response.status.calledWith(404)).to.be.equal(false);
  });
});

describe('Post error', () => {

  const mockGetAll = [{ name: "product" }]

  before(() => {
    request.body = { name: "product", quantity: 5 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'getAllProducts').resolves(mockGetAll);
  });
  after(() => service.getAllProducts.restore());

  it('return status 409 When the product exists', async () => {
    await ProductsController.post(request, response);
    expect(response.status.calledWith(409)).to.be.equal(true);
  });

  it('return error message', async () => {
    await ProductsController.getAll(request, response);
    expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
  });
})

describe('Post accepted', () => {

  const mockGetAll = [{ name: "oldProduct", quantity: 2 }]

  before(() => {
    request.body = { name: "newProduct", quantity: 5 };
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(service, 'getAllProducts').resolves(mockGetAll);
    sinon.stub(service, 'postProduct').returns({ name: "newProduct", quantity: 5 });
  });
  after(() => service.getAllProducts.restore());

  it('return status 201 When the product not exists in database', async () => {
    await ProductsController.post(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });
});
