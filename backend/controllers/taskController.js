const { Task } = require('../models');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { Op } = require('sequelize');

// GET /api/tasks  — fetch all tasks belonging to the logged-in user
const getTasks = catchAsync(async (req, res, next) => {
  const { status, priority, search } = req.query;

  const where = { userId: req.user.id };

  if (status && ['Pending', 'Completed'].includes(status)) {
    where.status = status;
  }
  if (priority && ['Low', 'Medium', 'High'].includes(priority)) {
    where.priority = priority;
  }
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const tasks = await Task.findAll({
    where,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: { tasks },
  });
});

// POST /api/tasks
const createTask = catchAsync(async (req, res, next) => {
  const { title, description, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    userId: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: { task },
  });
});

// PATCH /api/tasks/:id
const updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) {
    return next(new AppError('Task not found or you do not own this task.', 404));
  }

  const { title, description, status, priority, dueDate } = req.body;

  await task.update({ title, description, status, priority, dueDate });

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

// DELETE /api/tasks/:id
const deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) {
    return next(new AppError('Task not found or you do not own this task.', 404));
  }

  await task.destroy();

  res.status(204).json({ status: 'success', data: null });
});

// PATCH /api/tasks/:id/toggle  — quick toggle Pending <-> Completed
const toggleTaskStatus = catchAsync(async (req, res, next) => {
  const task = await Task.findOne({
    where: { id: req.params.id, userId: req.user.id },
  });

  if (!task) {
    return next(new AppError('Task not found or you do not own this task.', 404));
  }

  task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
  await task.save();

  res.status(200).json({
    status: 'success',
    data: { task },
  });
});

module.exports = { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus };
