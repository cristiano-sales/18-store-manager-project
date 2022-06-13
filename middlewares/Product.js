const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../utils/status');

const productNameQuantity = (req, res, next) => {
  const { name, quantity } = req.body;
  if (!name) {
    res.status(BAD_REQUEST).json({ message: '"name" is required' });
    return;
  } if (name.length < 5) {
    res.status(UNPROCESSABLE_ENTITY).json({
       message: '"name" length must be at least 5 characters long' });
    return;
}
  // 
  if (quantity < 1) {
    res.status(UNPROCESSABLE_ENTITY).json({
       message: '"quantity" must be greater than or equal to 1' });
    return; 
} if (!quantity) {
    res.status(BAD_REQUEST).json({ message: '"quantity" is required' });
    return;
  } next();
};

module.exports = productNameQuantity;
