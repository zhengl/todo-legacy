var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');
var uuid = require('node-uuid');

var database = {
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

var SERVER_PORT = 3000;
var APP_PORT = 8080;

webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + APP_PORT, 'webpack/hot/dev-server');
var compiler = webpack(webpackConfig);

var app = new WebpackDevServer(compiler, {
  contentBase: 'public',
  hot: true,
  inline: true,
  historyApiFallback: true,
  stats: {colors: true},
});


app.listen(APP_PORT, function() {
/* eslint-disable no-console */
  console.log('App is now running on http://localhost:' + APP_PORT);
});

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

server.get('/todos', function(req, res) {
  res.json(database.todos);
});

server.post('/todos', function(req, res) {
  var newTodo = {
    id: uuid.v1(),
    content: req.body.content,
  };
  database.todos.unshift(newTodo);
  res.json(newTodo);
});

server.delete('/todos/:id', function(req, res) {
  database.todos = database.todos.filter(function(todo) { return todo.id !== req.params.id; });
  res.json(database.todos);
});

server.put('/todos/:id', function(req, res) {
  var targetTodo = database.todos.find(function(todo) { return todo.id === req.params.id; });
  targetTodo.content = req.body.content;
  res.json(targetTodo);
});

server.listen(SERVER_PORT, function() {
/* eslint-disable no-console */
  console.log('Server is now running on http://localhost:' + SERVER_PORT);
});
