const express = require('express');
const winston = require('winston');
const morgan = require('morgan');

const app = express();

// Logger setup
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Morgan setup
app.use(morgan('combined', { stream: logger.stream }));

// Other middleware and routes setup...

const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);
  
    // Send an appropriate response to the client
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message
    });
  };

  // Add error handling middleware
app.use(errorHandler);
