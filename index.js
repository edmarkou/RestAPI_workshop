const express = require('express');
const app = express();
const peopleRouter = require('./routes/peopleRoutes');
const { logErrorToFile, errorHandler, clientErrorHandler } = require('./middleware/errorMiddleware');


// Configure middleware to support JSON data parsing in request object
app.use(express.json());

// Configure router so that all routes are prefixed with /api
app.use('/api/', peopleRouter);

// Configure exception logger to file
app.use(logErrorToFile);
// Configure client error handler
app.use(clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHandler);

// Create server to listen on port 5000
app.listen(5000, () => {
  console.log("Node server is running on port 5000");
});