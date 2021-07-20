const express = require('express'),
  apiRouter = express.Router(),
  auth = require('./auth/auth')(),
  user = require('./accounts/user/user')();


//**************************************User*******************************************************/
apiRouter.post('/api/v1/register', user.register);
apiRouter.get('/api/v1/user',  user.getUsers);
apiRouter.get('/api/v1/user/:_id',  user.getUserById);
apiRouter.put('/api/v1/user/:_id', user.putUser);
apiRouter.delete('/api/v1/user/:_id', user.deleteUser);

//**************************************Auth*******************************************************/
apiRouter.post('/api/v1/role', auth.postRole);
apiRouter.put('/api/v1/role/:_id', auth.putRole);
apiRouter.delete('/api/v1/role/:_id', auth.deleteRole);
apiRouter.get('/api/v1/role', auth.getRole);
apiRouter.get('/api/v1/role/:_id', auth.getRoleById);

module.exports = apiRouter;
