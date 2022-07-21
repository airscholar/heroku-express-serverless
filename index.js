const express = require('express');
const serverless = require('serverless-http');

const todosRoute = require('./routes/todo.route');

const app = express();

app.use(express.json());

app.use('/todos', todosRoute);

app.listen(process.env.PORT, () => {
  console.log('app listening on ' + process.env.PORT);
});

module.exports.handler = serverless(app);
