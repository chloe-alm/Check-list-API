'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    
    static associate(models) {
      models.List.belongsTo(models.User,{
        foreignKey:"userId",
      });
      models.List.hasMany(models.Task,{
        foreignKey:"listId",
      });
      
    }
  };
  List.init({
    listName: {type:DataTypes.STRING, allowNull: false},
    userId: {type:DataTypes.INTEGER},
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};