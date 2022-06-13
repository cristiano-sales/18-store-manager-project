const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/status');

const verifyErrors = (res, next, errorArray) => {
  if (errorArray[0]) {
    return res.status(errorArray[0].status).json({ message: errorArray[0].message }); 
} next();
};

const Sales = (req, res, next) => {
  const errorArray = [];
    req.body.forEach(({ productId, quantity }) => {
      if (!productId) {
        errorArray.push({ status: BAD_REQUEST, message: '"productId" is required' });
      } 
      if (!quantity) {
        errorArray.push({ status: BAD_REQUEST, message: '"quantity" is required' });
      } 
      if (quantity < 1) {
        errorArray.push({
          status: UNPROCESSABLE_ENTITY,
          message: '"quantity" must be greater than or equal to 1',
      });
    }
});
    verifyErrors(res, next, errorArray);
};

module.exports = Sales;
