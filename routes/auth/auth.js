module.exports = () => {
  const { Role } = require('../../models/User');

  return require('./auth.factory')({
    Role,
  });
};
