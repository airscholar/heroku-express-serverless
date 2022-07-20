const express = require('express');
const {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos,
  getTodoById,
} = require('../controllers/todo.controller');

const todosRoute = express.Router();

todosRoute.route('/').get(getTodos).post(createTodos);
todosRoute.route('/:todoId').get(getTodoById).patch(updateTodos).delete(deleteTodos);

module.exports = todosRoute;
