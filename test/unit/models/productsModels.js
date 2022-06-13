const sinon = require('sinon');
const { expect } = require("chai");
const { getAll, getById, deleteProduct, postProduct } = require("../../../models/Products");
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

describe('Post product', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([[{ id: 9, name: 'wakasanamauê', quantity: 9 }]]);
  });
  after(() => connection.execute.restore());

  it('check object properties', async () => {
      const result = await postProduct('wakasanamauê', 9);
      expect(result).to.haveOwnProperty('id');
      expect(result).to.haveOwnProperty('name');
      expect(result).to.haveOwnProperty('quantity');
  });

  it('Check values', async () => {
    const result = await postProduct('wakasanamauê', 9);
    expect(result.id).to.equal(9);
    expect(result.name).to.equal('wakasanamauê');
    expect(result.quantity).to.equal(9);
});

});

describe('Delete product by id', () => {

  before(() => {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
  });
  after(() => connection.execute.restore());

  it('If exist product with id 2', async () => {
      const { affectedRows } = await deleteProduct(2);
      expect(affectedRows).to.be.equal(1);
  });

  it('If exist product with id 5', async () => {
    const { affectedRows } = await deleteProduct(5);
    expect(affectedRows).to.be.equal(1);
});
});
