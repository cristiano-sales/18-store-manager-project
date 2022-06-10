const errorHandler = (error, req, res, _) => {
  res.status(error.status || 500).json({ message: error.message || 'Error not found' });
};

module.exports = errorHandler;
