const decodeToken = require('../middlewares/decodeToken');
const UserRepository = require('../repositories/UserRepository');
const { createPassword } = require('../utils/passwordManagement');

class UserController {
  async update(request, response) {
    try {
      const { id } = await decodeToken(request);
      if (!id) {
        return response.status(500)
          .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
      }

      const { name, password } = request.body;

      if (!name) {
        return response.status(402)
          .json({ error: 'O nome é obrigatório!' });
      }

      if (!password) {
        return response.status(402)
          .json({ error: 'A senha é obrigatória!' });
      }

      const newPassword = await createPassword(password);

      await UserRepository.update({
        name,
        password: newPassword,
      }, id);

      response.status(200)
        .json({
          msg: 'Usuário editado com sucesso!',
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = await decodeToken(request);
      if (!id) {
        return response.status(500)
          .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
      }

      await UserRepository.delete(id);

      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async findAllByName(request, response) {
    try {
      const { name } = request.query;
      if (!name) {
        return response.status(402)
          .json({ error: 'Você precisa informar o nome(name) em query' });
      }

      const users = await UserRepository.getAllByName(name);

      if (!users || !users.length) {
        return response.status(404)
          .json({ error: 'Nem um usuário foi encontrado!' });
      }

      response.status(200)
        .json({
          msg: 'Usuários encontrados com sucesso!',
          data: users,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async findAllPopularUsersInPost(request, response) {
    try {
      const users = await UserRepository.getAllPopularUsersInPost();

      response.status(200)
        .json({
          msg: 'Usuários mais populares encontrados com sucesso!',
          data: users,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new UserController();
