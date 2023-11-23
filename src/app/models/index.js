const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Esse campo precisa ser um e-mail',
      },
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
}, {
  tableName: 'users',
});

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'posts',
});

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Esse campo não pode ser vázio',
      },
    },
  },
  id_post: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'comments',
});

// RELACAO USUARIO COM POST E COMMENTS
User.hasMany(Post, {
  foreignKey: {
    name: 'id_user',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  as: 'posts',
});
User.hasMany(Comment, {
  foreignKey: {
    name: 'id_user',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  as: 'comments',
});
Post.belongsTo(User, {
  as: 'user',
  foreignKey: 'id_user',
});
Comment.belongsTo(User, {
  as: 'user',
  foreignKey: 'id_user',
});

// RELACAO POST COM COMENTARIO
Post.hasMany(Comment, {
  foreignKey: {
    name: 'id_post',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  as: 'comments',
});
Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: 'id_post',
});

const db = {
  User,
  Post,
  Comment,
  sequelize,
};

module.exports = db;
