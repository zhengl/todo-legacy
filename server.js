import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';
import uuid from 'node-uuid';

const database = {
  todos: [
    {
      id: uuid.v1(),
      content: 'Item 1',
    },
    {
      id: uuid.v1(),
      content: 'Item 2',
    },
  ],
};

const REST_PORT = 3000;
const APP_PORT = 8080;

const compiler = webpack(webpackConfig);

const app = new WebpackDevServer(compiler, {
  contentBase: 'public',
  hot: true,
  historyApiFallback: true,
  inline: true,
  stats: {colors: true},
});


app.listen(APP_PORT, () => {
/* eslint-disable no-console */
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

server.get('/todos', (req, res) => {
  res.json(database.todos);
});

server.post('/todos', (req, res) => {
  const newTodo = {
    id: uuid.v1(),
    content: req.body.content,
  };
  database.todos.unshift(newTodo);
  res.json(newTodo);
});

server.delete('/todos/:id', (req, res) => {
  database.todos = database.todos.filter( todo => todo.id !== req.params.id );
  res.json(database.todos);
});

server.put('/todos/:id', (req, res) => {
  const targetTodo = database.todos.find(todo => todo.id === req.params.id);
  targetTodo.content = req.body.content;
  res.json(targetTodo);
});

server.listen(REST_PORT, () => {
/* eslint-disable no-console */
  console.log(`Restful Server is now running on http://localhost:${REST_PORT}`);
});
