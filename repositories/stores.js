const Store = require('../models/store');

const getAll = async (query) => {
    const {page , limit} = query
    const stores = await Store.find().limit(limit || 10).skip(limit || 10 * Math.max(0, page))
    return stores;
};




module.exports = {
    getAll,

};
