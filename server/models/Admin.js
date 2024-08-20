const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
