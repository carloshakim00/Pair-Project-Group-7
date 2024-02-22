'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, {foreignKey: "UserId"});
      User.hasMany(models.Transaction, {foreignKey: "UserId"});
      User.belongsToMany(models.Product, {through: models.Transaction});
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email is required.",
          },
          notNull: {
            msg: "Email is required.",
          },
          async isUniqueEmail(value) {
            const email = await User.findOne({ where: { email: value } });
            if (email) {
              throw new Error("Email sudah digunakan!");
            }
          },
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required.",
        },
        notNull: {
          msg: "Password is required.",
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role is required.",
        },
        notNull: {
          msg: "Role is required.",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};