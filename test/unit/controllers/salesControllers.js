const sinon = require('sinon');
const { expect } = require("chai");

const SalesController = require("../../../controllers/Sales");
const service = require('../../../services/Sales');

const response = {};
const request = {};

describe('Search all Sales - Controller', () => {
  describe('getAll function', () => {

    const mockGetAll = [
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 5,
        "date": "2022-06-01T22:22:44.000Z"
      },
      {
        "saleId": 1,
        "productId": 2,
        "quantity": 10,
        "date": "2022-06-01T22:22:44.000Z"
      },
      {
        "saleId": 2,
        "productId": 3,
        "quantity": 15,
        "date": "2022-06-01T22:22:44.000Z"
      }
    ]

    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(service, 'getAllSales').resolves(mockGetAll);
    });
    after(() => service.getAllSales.restore());

    it('return status 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('return all products', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith(mockGetAll)).to.be.equal(true);
    });
  })

  describe('getAll with 0 products in DataBase', () => {

    const mockGetAll = []

    before(() => {

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(service, 'getAllSales').resolves(mockGetAll);
    });
    after(() => service.getAllSales.restore());

    it('return status 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('return an empty array', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  })
}); 

// SAle

describe('getById', () => {

  const mockGetById = [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    }
  ]

  before(() => {

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    request.params = 1;

    sinon.stub(service, 'getSaleById').resolves(mockGetById);
  });
  after(() => service.getSaleById.restore());

  it('return status 200', async () => {
    await SalesController.getById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('return array with one object', async () => {
    await SalesController.getById(request, response);
    expect(response.json.calledWith(mockGetById)).to.be.equal(true);
  });

  it('NOT return status 404', async () => {
    await SalesController.getById(request, response);
    expect(response.status.calledWith(404)).to.be.equal(false);
  });
});
