const { body } = require('express-validator');

const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Task title is required')
    .isLength({ min: 1, max: 200 }).withMessage('Title must be 1–200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description can be at most 1000 characters'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date (YYYY-MM-DD)')
    .toDate(),
];

const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ min: 1, max: 200 }).withMessage('Title must be 1–200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description can be at most 1000 characters'),

  body('status')
    .optional()
    .isIn(['Pending', 'Completed']).withMessage('Status must be Pending or Completed'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date (YYYY-MM-DD)')
    .toDate(),
];

module.exports = { createTaskValidation, updateTaskValidation };
