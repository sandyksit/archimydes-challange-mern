const extend = require('util')._extend;
module.exports = ({ Role }) => {

  async function postRole(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    const opt = extend({}, req.body);
    const role = new Role(opt);
    await role
      .save()
      .then((doc) => {
        return_response.status = 200;
        return_response.message = 'success';
        return_response.data = doc;
      })
      .catch((error) => {
        return_response.status = 400;
        return_response.message = String(error);
      });

    return res.status(return_response.status).json(return_response);
  }

  async function getRole(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    await Role.find({})
      .exec()
      .then((doc) => {
        return_response.status = 200;
        return_response.message = 'success';
        return_response.data = doc;
      })
      .catch((error) => {
        return_response.status = 400;
        return_response.message = String(error);
      });
    return res.status(return_response.status).json(return_response);
  }

  async function getRoleById(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    await Role.find({ _id: req.params._id })
      .exec()
      .then((doc) => {
        return_response.status = 200;
        return_response.message = 'success';
        return_response.data = doc;
      })
      .catch((error) => {
        return_response.status = 400;
        return_response.message = String(error);
      });
    return res.status(return_response.status).json(return_response);
  }

  async function deleteRole(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    await Role.deleteOne({ _id: req.params._id })
      .then((doc) => {
        return_response.status = 200;
        return_response.message = 'success';
        return_response.data = doc;
      })
      .catch((error) => {
        return_response.status = 400;
        return_response.message = String(error);
      });
    return res.status(return_response.status).json(return_response);
  }

  async function putRole(req, res) {
    const return_response = {
      status: null,
      message: null,
      data: null,
    };
    const opt = extend({}, req.body);
    await Role.findOneAndUpdate({ _id: req.params._id }, opt, { new: true })
      .then((doc) => {
        return_response.status = 200;
        return_response.message = 'success';
        return_response.data = doc;
      })
      .catch((error) => {
        return_response.status = 400;
        return_response.message = String(error);
      });
    return res.status(return_response.status).json(return_response);
  }

  return {
    postRole,
    getRole,
    getRoleById,
    putRole,
    deleteRole,
  };
};
