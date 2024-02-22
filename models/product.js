'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Transaction, {foreignKey: "ProductId"});
      Product.belongsToMany(models.User, {through: models.Transaction});
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    productCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};