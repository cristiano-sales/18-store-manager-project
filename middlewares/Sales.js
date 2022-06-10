const verifyErrors = (res, next, errorArray) => {
  if (errorArray[0]) {
    return res.status(errorArray[0].status).json({ message: errorArray[0].message }); 
} next();
};

const Sales = (req, res, next) => {
  const errorArray = [];
    req.body.forEach(({ productId, quantity }) => {
      if (!productId) {
        errorArray.push({ status: 400, message: '"productId" is required' });
      } 
      if (!quantity) {
        errorArray.push({ status: 400, message: '"quantity" is required' });
      } 
      if (quantity < 1) {
        errorArray.push({
          status: 422,
          message: '"quantity" must be greater than or equal to 1',
      });
    }
});
  verifyErrors(res, next, errorArray);
};

module.exports = Sales;
