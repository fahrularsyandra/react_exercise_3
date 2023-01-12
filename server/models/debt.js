'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class debt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      debt.hasMany(models.transaction, {
        foreignKey: "debt_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  debt.init({
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'debt',
  });
  return debt;
};