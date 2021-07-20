const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { appConfig } = require('./setup')();
const apiRouter = require('../routes/api');

// Mongoose setup and config.
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
// Mongoose connection.
mongoose
  .connect(appConfig.dbPath, {})
  .then(() => {
    console.log(`connected to mongo ${appConfig.dbPath}`);
  })
  .catch((error) => {
    console.error('Error connecting to database', error); //TODO: Use logger
  });

// Express app setup and configuration
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// Setup origin access rules
app.use(function (req, res, next) {
  req.accepts('*/*');
  req.acceptsEncodings(['gzip', 'deflate', 'sdch', 'br']);
  next();
});

// To allow cross origin access.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(apiRouter);

// Setup logging
app.use(
  morgan('dev', {
    skip: (req, res) => res.statusCode < 400,
  }),
);

app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'rest_api.log'), {
      flags: 'a',
    }),
  }),
);

const PORT = process.env.PORT || 5000;

console.log('Environment: ', app.get('env'), '\nPort:', PORT);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
