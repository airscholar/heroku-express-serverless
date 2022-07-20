const express = require('express');
const serverless = require('serverless-http');

const todosRoute = require('./routes/todo.route');

const app = express();

app.use(express.json());

app.use('/todos', todosRoute);

app.listen(3000, () => {
  console.log('app listening on 3000');
});

module.exports.handler = serverless(app);