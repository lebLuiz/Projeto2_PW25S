const decodeToken = require('../middlewares/decodeToken');
const CommentRepository = require('../repositories/CommentRepository');

const UserRepository = require('../repositories/UserRepository');
const PostRepository = require('../repositories/PostRepository');

class CommentController {
  async store(request, response) {
    try {
      const { id } = await decodeToken(request);
      if (!id) {
        return response.status(500)
          .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
      }

      const { id_post, comment } = request.body;

      if (!id_post) {
        return response.status(402)
          .json({ error: 'O codigo da postagem é obrigatório!' });
      }

      if (!comment) {
        return response.status(402)
          .json({ error: 'O comentário é obrigatório!' });
      }

      const user = await UserRepository.show(id);
      if (!user) {
        return response.status(404)
          .json({ error: 'Usuário especificado não encontrado!' });
      }

      const post = await PostRepository.show(id_post);
      if (!post) {
        return response.status(404)
          .json({ error: 'Postagem especificada não encontrada!' });
      }

      await CommentRepository.create({
        comment,
        id_user: id,
        id_post,
      });

      response.status(201)
        .json({
          msg: 'Comentário criado com sucesso!',
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

      const user = await UserRepository.show(id_user);
      if (!user) {
        return response.status(404)
          .json({ error: 'Usuário especificado não encontrado!' });
      }

      const { id } = request.params;
      if (!id) {
        return response.status(402)
          .json({ error: 'Você precisa informar o código(id) no parâmetro!' });
      }
      const comment = await CommentRepository.show(id);
      if (!comment) {
        return response.status(404)
          .json({ error: 'Comentário especificado não encontrado!' });
      }

      if (comment.id_user !== id_user) {
        return response.status(403)
          .json({ error: 'Você não pode excluir esse comentário!' });
      }

      await CommentRepository.delete(id);

      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }

  async findAllByPost(request, response) {
    try {
      const { id_post } = request.params;
      if (!id_post) {
        return response.status(402)
          .json({ error: 'Você precisa informar o codigo da postagem(id_post) em params' });
      }

      const comments = await CommentRepository.getAllByPost(id_post);

      if (!comments || !comments?.length) {
        return response.status(404)
          .json({ error: 'Comentários não encontrados para essa postagem!' });
      }

      response.status(200)
        .json({
          msg: 'Comentários encontrados com sucesso!',
          data: comments,
        });
    } catch (error) {
      console.log(error);
      response.status(500)
        .json({ error: 'Aconteceu um erro, tente novamente mais tarde!' });
    }
  }
}

// Singleton
module.exports = new CommentController();
