// errorHandlingMiddleware.js
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack trace
    res.status(500).render('error', { error: 'Internal Server Error' }); // Render error page
  }
  
  module.exports = errorHandler;
  