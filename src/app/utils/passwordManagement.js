const bcrypt = require('bcrypt');

async function createPassword(password) {
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function comparePassword(password, passwordEncrypted) {
  const checked = await bcrypt.compare(password, passwordEncrypted);
  return checked;
}

module.exports = { createPassword, comparePassword };
