const storesRepository = require('../repositories/stores');

const getAll = async (query) => {
  const stores = await storesRepository.getAll(query);
  return stores;
};

const create = async (body) => {
  const stores = await storesRepository.create(body);
  return stores;
};

module.exports = {
  getAll,
  create,
};
