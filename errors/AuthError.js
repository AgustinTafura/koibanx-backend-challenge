class AuthError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static badRequest(msg) {
      return new AuthError(401, msg);
    }
  }
  
  module.exports = AuthError;