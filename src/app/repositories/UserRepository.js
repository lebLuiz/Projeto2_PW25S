const {
  Op, fn, col, literal,
} = require('sequelize');
const { User, Post } = require('../models');

class UserRepository {
  async show(id) {
    const user = await User.findByPk(id);
    return user;
  }

  async create(_user) {
    const userCreated = await User.create({
      name: _user.name,
      email: _user.email,
      password: _user.password,
    });

    return userCreated;
  }

  async update(_user, _id) {
    const userUpdated = await User.update({
      name: _user.name,
      email: _user.email,
      password: _user.password,
    }, {
      where: {
        id: _id,
      },
    });

    return userUpdated;
  }

  async delete(id) {
    const userDeleted = await User.destroy({
      where: {
        id,
      },
    });

    return userDeleted;
  }

  async getAllPopularUsersInPost() {
    const users = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        [fn('COALESCE', fn('SUM', col('posts.likes')), 0), 'total_likes'],
        'createdAt',
        'updatedAt',
      ],
      include: [{
        model: Post,
        as: 'posts',
        attributes: [],
      }],
      group: ['User.id'],
      order: [[literal('total_likes'), 'DESC']],
    });
    return users;
  }

  async getAllByName(name) {
    const users = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
    return users;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = new UserRepository();
