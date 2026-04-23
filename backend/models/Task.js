const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed'),
      defaultValue: 'Pending',
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium',
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'due_date',
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Task;
