var Backbone = require('backbone');
var Todo = require('../Todo/Todo');

var Todos = Backbone.Collection.extend({
  model: Todo,
  url: '/todos',
});

module.exports = Todos;
