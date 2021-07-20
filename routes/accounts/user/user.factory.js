module.exports = ({ extend, bcrypt, util, validators, User }) => {

  async function register(req, res) {
    const return_response = {
      token: null,
      message: null,
      data: null,
    };
    const result = validators.RegisterInput(req.body);
    if (!result.isValid) {
      return_response['message'] = result['message'];
      return res.status(400).json(return_response);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return_response['message'] = 'User allready exist!';
      return res.status(400).json(return_response);
    }
    const opt = extend({}, req.body);
    try {
      user = new User(opt);
      user = await user.save();
    } catch (error) {
      return_response['message'] = String(error);
      return res.status(400).json(return_response);
    }
    return_response['message'] = 'success';
    return_response['data'] = user;
    return res.status(201).json(return_response);
  }

  async function getUsers(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    User.find({})
      .select('-password')
      .populate('role')
      .exec(function (error, doc) {
        if (error) {
          return_response['status'] = 400;
          return_response['message'] = String(error);
        } else {
          return_response['status'] = 200;
          return_response['message'] = 'success';
          return_response['data'] = doc;
        }
        res.status(return_response['status']).json(return_response);
      });
  }

  async function getUserById(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    User.find({ _id: req.params._id })
      .select('-password')
      .exec(function (error, doc) {
        if (error) {
          return_response['status'] = 400;
          return_response['message'] = String(error);
        } else {
          return_response['status'] = 200;
          return_response['message'] = 'success';
          return_response['data'] = doc;
        }
        res.status(return_response['status']).json(return_response);
      });
  }

  async function deleteUser(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    User.deleteOne({ _id: req.params._id }, function (error, doc) {
      if (error) {
        return_response['status'] = 400;
        return_response['message'] = String(error);
      } else {
        return_response['status'] = 200;
        return_response['message'] = 'success';
        return_response['data'] = doc;
      }
      res.status(return_response['status']).json(return_response);
    });
  }

  async function putUser(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    const opt = extend({}, req.body);
    User.findOneAndUpdate({ _id: req.params._id }, opt, { new: true }, function (error, doc) {
      if (error) {
        return_response['status'] = 400;
        return_response['message'] = String(error);
      } else {
        return_response['status'] = 200;
        return_response['message'] = 'success';
        return_response['data'] = doc;
      }
      res.status(return_response['status']).json(return_response);
    });
  }

  return {
    register,
    getUsers,
    putUser,
    getUserById,
    deleteUser,
  };
};
