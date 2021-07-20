const fs = require('fs');
module.exports = () => {
  const securityKey = JSON.parse(fs.readFileSync('security-keys.json', 'utf8'));
  const {
    MONGO_HOST: mongoHost = securityKey.database.dbhost,
    MONGO_PORT: mongoPort = securityKey.database.dbport,
    MONGO_USER: mongoUser = securityKey.database.dbuser,
    MONGO_PASS: mongoPass = securityKey.database.dbpass,
    MONGO_BDNAME: mongoDbName = securityKey.database.dbname,
    PORT: port = securityKey.apiPort,
    ENV: environment = securityKey.environment,
  } = process.env;
  const appConfig = {
    secret: securityKey.session.secret,
    environment: environment,
    dbPath: `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDbName}?ssl=false&authSource=admin&retryWrites=true`,
    protocol: 'http',
    port: port,
    session: securityKey.session,
  };

  if (environment === 'test') {
    appConfig.dbPath = 'mongodb://localhost:27017/test';
  } else if (environment !== 'production') {
    appConfig.dbPath = 'mongodb://localhost:27017/archimydes-challange';
  }

  return {
    appConfig,
  };
};
