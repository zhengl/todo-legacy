var Backbone = require('backbone');
var Todo = require('../Todo/Todo');

var Todos = Backbone.Collection.extend({
  model: Todo,
  url: 'http://localhost:3000/todos',
});

module.exports = Todos;
