const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const {
  createPassword,
  comparePassword,
} = require('../utils/passwordManagement');

class AuthController {
  async store(request, response) {
    const {
      name,
      email,
      password,
      confirm_password,
    } = request.body;

    if (!name) {
      return response.status(402)
        .json({ error: 'O nome é obrigatório!' });
    }

    if (!email) {
      return response.status(402)
        .json({ error: 'O email é obrigatório!' });
    }

    if (!password) {
      return response.status(402)
        .json({ error: 'A senha é obrigatória!' });
    }

    if (password !== confirm_password) {
      return response.status(402)
        .json({ error: 'As senhas não conferem!' });
    }

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return response.status(402)
        .json({ error: 'Por favor, utilize outro e-mail!' });
    }

    const newPassword = await createPassword(password);
    try {
      const userPayload = {
        name,
        email,
        password: newPassword,
      };

      await UserRepository.create(userPayload);

      response.status(201)
        .json({ msg: 'Usuário criado com sucesso!' });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async login(request, response) {
    const { email, password } = request.body;

    if (!email) {
      return response.status(402)
        .json({ error: 'O email é obrigatório!' });
    }

    if (!password) {
      return response.status(402)
        .json({ error: 'A senha é obrigatória!' });
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return response.status(404)
        .json({ error: 'Usuário não encontrado!' });
    }

    const checkedPassword = await comparePassword(password, user.password);
    if (!checkedPassword) {
      return response.status(422)
        .json({ error: 'Senha inválida!' });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        secret,
      );

      response.status(200)
        .json({ msg: 'Autenticação realizada com sucesso!', token });
    } catch (err) {
      console.log(err);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new AuthController();
