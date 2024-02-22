'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, {foreignKey: "UserId"});
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required.",
          },
          notNull: {
            msg: "Name is required.",
          }
        },
    },
    address: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is required.",
          },
          notNull: {
            msg: "Address is required.",
          }
        },
    },
    phone: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number is required.",
          },
          notNull: {
            msg: "Phone Number is required.",
          }
        },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users"
        },
        key: "id"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
  }}, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};