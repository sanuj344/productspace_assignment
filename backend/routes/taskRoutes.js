const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { createTaskValidation, updateTaskValidation } = require('../validations/taskValidation');
const { validate } = require('../middleware/validate');

// All task routes are protected
router.use(protect);

router.route('/').get(getTasks).post(createTaskValidation, validate, createTask);

router.route('/:id').patch(updateTaskValidation, validate, updateTask).delete(deleteTask);

router.patch('/:id/toggle', toggleTaskStatus);

module.exports = router;
