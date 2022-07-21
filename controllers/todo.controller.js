const uuid = require('uuid').v4;

const todos = [];

const getTodos = (req, res) => {
  res.json({
    message: 'Retrieved successfully!',
    data: todos,
  });
};

const createTodos = (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    const todo = { id: uuid(), title, description, isCompleted };

    //   check to prevent duplicate
    const existingTodo = todos.find(item => item.title === todo.title);
    if (existingTodo) return res.json({ message: 'Todo already exist', data: {} });

    //add todo
    todos.push(todo);

    return res.json({
      message: 'Saved successfully!',
      data: todos,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const getTodoById = (req, res) => {
  try {
    const { todoId } = req.params;

    const idx = findById(todoId, res);

    const existingTodo = todos[idx];

    return res.json({
      message: 'Retreived successfully!',
      data: existingTodo,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const updateTodos = (req, res) => {
  try {
    const { todoId } = req.params;
    const { title, description, isCompleted } = req.body;

    const idx = findById(todoId, res);
    const existingTodo = todos[idx];

    existingTodo.id = todoId;
    //   replace existing todo
    if (title) {
      existingTodo.title = title;
    }
    if (description) {
      existingTodo.description = description;
    }
    if (isCompleted) {
      existingTodo.isCompleted = isCompleted;
    }

    //   remove the todo
    todos.slice(idx, 1);

    //   add it back
    todos.push(existingTodo);

    return res.json({
      message: 'Updated successfully!',
      data: existingTodo,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

const findById = (todoId, res) => {
  const idx = todos.findIndex(item => item.id === todoId);

  if (idx < 0) throw new Error(`Todo with Id '${todoId}' not found`);

  return idx;
};

const deleteTodos = (req, res) => {
  try {
    const { todoId } = req.params;

    const idx = findById(todoId, res);

    todos.splice(idx, 1);

    return res.json({
      message: 'Deleted successfully!',
      data: {},
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

module.exports = { getTodos, createTodos, updateTodos, deleteTodos, getTodoById };
