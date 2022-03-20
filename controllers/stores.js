const storesService = require('../services/stores');

const getAll = async (req, res, next) => {
  try {
    const query = req.query.q ? JSON.parse(req.query.q) : {}
    const stores = await storesService.getAll(query);
    res.status(200).json(stores);
  } catch (e) {
    next(e);
  }
};



module.exports = {
  getAll,

};
