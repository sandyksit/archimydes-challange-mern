module.exports = () => {
  const jwt = require('jsonwebtoken');
  const { appConfig } = require('../src/setup')();

  async function generateAuthToken(user) {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //24hour
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, appConfig.session.secret);
    return token;
  }

  return {
    generateAuthToken,
  };
};
