const Store = require('../models/store')
const logger = require('../utils/logger')
const storeList = require('./stores.json')

const stores = async () => {
    const storesCount = await Store.countDocuments()
    if (!storesCount) {
        for (const elem in storeList) {
            const data = storeList[elem];
        let store = new Store(data);
        await Store.create(store);
    }
        logger.info("Test Stores created")
    }

}


module.exports = {
    stores
}