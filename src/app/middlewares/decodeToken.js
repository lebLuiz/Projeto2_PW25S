const jwt = require('jsonwebtoken');

module.exports = (req) => new Promise((resolve, reject) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    reject({ error: 'Acesso negado!' });
  }

  try {
    const secret = process.env.SECRET;

    const encodeUser = jwt.verify(token, secret);

    resolve(encodeUser);
  } catch (error) {
    reject({ error: 'Token inválido!' });
  }
});
