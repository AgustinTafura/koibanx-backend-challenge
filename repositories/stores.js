const Store = require('../models/stores');

const getAll = async (query) => {
    const {page , limit} = query
    const count = await Store.countDocuments()
    const limiting = limit || 10;
    const skipping = (page * limit) || 0;
    const data = await Store.find().limit(limiting).skip(skipping)
    return {
        data,
        page: Math.max(1, page),
        pages:  Math.ceil(count / limiting),
        limit: limiting,
        total: count,
    };
};




module.exports = {
    getAll,

};
