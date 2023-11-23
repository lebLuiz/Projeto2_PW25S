const decodeToken = require('../middlewares/decodeToken');
const PostRepository = require('../repositories/PostRepository');

class PostController {
  async store(request, response) {
    try {
      const { id } = await decodeToken(request);
      if (!id) {
        return response.status(500)
          .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
      }

      const { title, description } = request.body;

      if (!title) {
        return response.status(402)
          .json({ error: 'O titulo é obrigatório!' });
      }

      if (!description) {
        return response.status(402)
          .json({ error: 'A descrição é obrigatória!' });
      }

      await PostRepository.create({
        title,
        description,
        id_user: id,
      });

      response.status(201)
        .json({
          msg: 'Postagem criada com sucesso!',
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async delete(request, response) {
    try {
      const { id: id_user } = await decodeToken(request);
      if (!id_user) {
        return response.status(500)
          .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
      }
      const { id } = request.params;
      const post = await PostRepository.show(id);
      if (!post) {
        return response.status(404)
          .json({ error: 'Postagem especificada não encontrada!' });
      }

      if (post.user.id !== id_user) {
        return response.status(403)
          .json({ error: 'Você não pode excluir essa postagem!' });
      }

      await PostRepository.delete(id);

      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(402)
          .json({ error: 'Você precisa informar o código(id) no parâmetro!' });
      }

      const post = await PostRepository.show(id);

      if (!post) {
        return response.status(404)
          .json({ error: 'Postagem não encontrada!' });
      }

      response.status(200)
        .json({
          msg: 'Postagem encontrada com sucesso!',
          data: post,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async findAllByUser(request, response) {
    try {
      const { id_user } = request.params;
      if (!id_user) {
        return response.status(402)
          .json({ error: 'Você precisa informar o código do usuário(id_user) no parâmetro!' });
      }

      const posts = await PostRepository.getAllByUser(id_user);

      if (!posts || !posts?.length) {
        return response.status(404)
          .json({ error: 'Postagens não encontradas para esse usuário!' });
      }

      response.status(200)
        .json({
          msg: 'Postagens encontradas com sucesso!',
          data: posts,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async addLike(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(402)
          .json({ error: 'Você precisa informar o código(id) no parâmetro!' });
      }

      const [[[post]]] = await PostRepository.like(id);

      if (!post) {
        return response.status(404)
          .json({ error: 'Aconteceu um erro, provavelmente você está tentando alterar a curtida de uma postagem que não existe mais!' });
      }

      response.status(200)
        .json({
          msg: 'Postagem recebeu +1 like(curtida)!',
          data: post,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new PostController();
