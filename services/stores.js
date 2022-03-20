const storesRepository = require('../repositories/stores');

const getAll = async (query) => {
  const stores = await storesRepository.getAll(query);
  return stores;
};



module.exports = {
  getAll,

};
