const { Post, User } = require('../models');

class PostRepository {
  async create(_post) {
    const postCreated = await Post.create({
      title: _post.title,
      description: _post.description,
      id_user: _post.id_user,
    });

    return postCreated;
  }

  async delete(id) {
    const postDeleted = await Post.destroy({
      where: {
        id,
      },
    });

    return postDeleted;
  }

  async show(id) {
    const post = await Post.findOne({
      where: {
        id,
      },
      attributes: ['id', 'title', 'description', 'likes', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return post;
  }

  async getAllByUser(id_user) {
    const posts = await Post.findAll({
      where: {
        id_user,
      },
      attributes: ['id', 'title', 'description', 'likes', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return posts;
  }

  async like(id) {
    const [postUpdated] = await Post.increment('likes', {
      where: {
        id,
      },
    });

    return [postUpdated];
  }
}

module.exports = new PostRepository();
