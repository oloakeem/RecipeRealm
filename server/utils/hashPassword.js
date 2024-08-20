const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// Replace 'yourSecurePassword' with the actual password you want to hash
hashPassword('yourSecurePassword');
