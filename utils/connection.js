const mongoose = require('mongoose');
const logger = require('../utils/logger')


const connection = mongoose.connection

const check = () => {
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', ()=>{
        logger.info('DataBase is connected')
    })
}

module.exports = {
    check
}