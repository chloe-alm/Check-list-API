'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    
    static associate(models) {
     models.Task.belongsTo(models.List,{
      foreignKey:"listId",
     })
    }
  };
  Task.init({
    listId:{type: DataTypes.INTEGER},
    taskName:{type: DataTypes.STRING},
    description: {type:DataTypes.STRING},
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};