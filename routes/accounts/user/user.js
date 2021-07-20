module.exports = () => {
  const extend = require('util')._extend;
  const bcrypt = require('bcrypt');
  const util = require('../../../utils/util')();
  const validators = require('../../../validation/validators')();
  const { User, Role, Permission } = require('../../../models/User');

  return require('./user.factory')({
    extend,
    bcrypt,
    util,
    validators,
    User,
    Role,
    Permission,
  });
};
