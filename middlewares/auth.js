const userService = require('../services/users');
const AuthError = require('../errors/AuthError');

const isAuth = async (req, res, next) => {
    
        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            next(AuthError.badRequest( 'Missing Authorization Header'))
            return
        }

        // verify auth credentials
        const base64Credentials =  req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');
        const user = await userService.authenticate({ username, password });
        
        if (!user)  {
            next(AuthError.badRequest('Invalid Authentication Credentials'))
            return
        }
        
        next();
}

module.exports = {
    isAuth
}

