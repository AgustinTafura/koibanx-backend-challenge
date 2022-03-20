const User = require('../models/user');

const authenticate = async (data) => {
    const { username, password } = data

    const user = await User.findOne({ username}).exec();
    if(!user) return
    
    return user.verifyPassword(password)

};

module.exports = {
    authenticate,
};
