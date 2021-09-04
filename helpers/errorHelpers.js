const errorHelpers = {
  buildInternalServerError: err => ({
    status: 500,
    statusText: "Internal Server Error",
    message: err.message,
    error: {
      errno: err.errno,
      call: err.syscall,
      code: "INTERNAL_SERVER_ERROR",
      message: err.message
    }
  }),
  buildNotFoundError: err => ({
    status: 404,
    statusText: "Not found",
    message: err.message,
    error: {
      code: "NOT_FOUND",
      message: err.message
    }
  }),
  logErrorToConsole: (err) => {
    console.error(`Log entry: ${JSON.stringify(err)}`);
    console.error("*".repeat(80));
  }
};

module.exports = errorHelpers;