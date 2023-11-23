const { Comment, Post } = require('../models');

class CommentRepository {
  async show(id) {
    const comment = await Comment.findByPk(id);
    return comment;
  }

  async create(_comment) {
    const commentCreated = await Comment.create({
      comment: _comment.comment,
      id_post: _comment.id_post,
      id_user: _comment.id_user,
    });

    return commentCreated;
  }

  async delete(id) {
    const commentDeleted = await Comment.destroy({
      where: {
        id,
      },
    });

    return commentDeleted;
  }

  async getAllByPost(id_post) {
    const post = await Comment.findAll({
      where: {
        id_post,
      },
      attributes: ['id', 'comment', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title', 'likes'],
        },
      ],
    });

    return post;
  }
}

module.exports = new CommentRepository();
