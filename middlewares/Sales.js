const Sales = (req, res, next) => {
  const salesArray = req.body;
    salesArray.forEach(({ productId, quantity }) => {
      if (!productId) {
        return res.status(400).json({ message: '"productId" is required' });
      } 
      if (!quantity) {
        return res.status(400).json({ message: '"productId" is required' });
      } 
      if (quantity < 1) {
        return res.status(422).json({
           message: '"quantity" must be greater than or equal to 1' });
    }
});
  next();
};

module.exports = Sales;
