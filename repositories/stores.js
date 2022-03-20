const Store = require('../models/store');

const getAll = async (query) => {
    const {page , limit} = query
    const count = await Store.countDocuments()
    const limiting = limit || 10;
    const skipping = (page * limit) || 0;
    const data = await Store.find().limit(limiting).skip(skipping)
    return {
        data,
        page: Math.max(page || 0),
        pages:  Math.ceil(count / limiting),
        limit: limiting,
        total: count,
    };
};


const create = async (body) => {
    let store = new Store(body)
    return await Store.create(store)
}



module.exports = {
    getAll,
    create,
};
