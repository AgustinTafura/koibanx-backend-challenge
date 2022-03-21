class HttpHandlerError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    static notFound(msg) {
      return new HttpHandlerError(404, msg || 'Route not found');
    }
  }
  
  module.exports = HttpHandlerError;