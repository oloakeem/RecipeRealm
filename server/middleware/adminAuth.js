const bcrypt = require('bcrypt');
const Admin = require('../models/Admin'); // Adjust the path to your model

async function verifyAdminPassword(inputPassword) {
  try {
    const admin = await Admin.findOne(); // Assuming only one admin

    if (!admin) {
      throw new Error('Admin not found');
    }

    const isMatch = await bcrypt.compare(inputPassword, admin.password);

    return isMatch;
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return false;
  }
}

module.exports = {
  verifyAdminPassword
};
