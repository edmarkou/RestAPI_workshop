const logRepo = require('../repos/logRepo');
const errorHelpers = require('../helpers/errorHelpers');

const errorMiddleware = {
  logErrorToFile: (err, req, res, next) => {
    const errorObject = errorHelpers.buildInternalServerError(err);
    errorObject.requestInfo = {
      hostname: req.hostname,
      path: req.path,
      app: req.app
    };
    logRepo.writeToFile(errorObject, log => {
      errorHelpers.logErrorToConsole(errorObject);
    }, err => {
      console.error(err);
    })
    next(err);
  },
  clientErrorHandler: (err, req, res, next) => {
    if (req.xhr) {
      res.status(500).json({
        status: 500,
        statusText: "Internal Server Error",
        message: "XMLHttpRequest error",
        error: {
          errno: 0,
          call: "XMLHttpRequest call",
          code: "INTERNAL_SEVER_ERROR",
          message: "XMLHttpRequest error"
        }
      })
    } else {
      next(err);
    }
  },
  errorHandler: (err, req, res, next) => {
    res.status(500).json(errorHelpers.buildInternalServerError(err))
  }
};

module.exports = errorMiddleware;