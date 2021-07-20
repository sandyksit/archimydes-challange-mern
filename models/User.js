const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  role: [{ type: Schema.Types.ObjectId, ref: 'role', required: true }],
});

const RoleSchema = new Schema({
  name: { type: String, required: true },
  active: { type: Boolean, default: true },
});


const User = mongoose.model('users', UserSchema);
const Role = mongoose.model('role', RoleSchema);

module.exports = {
  User,
  Role,
};
