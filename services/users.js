const storesRepository = require('../repositories/users');

const authenticate = async (data) => {
  const stores = await storesRepository.authenticate(data);
  return stores;
};


module.exports = {
  authenticate,
};