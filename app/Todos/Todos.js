var Backbone = require('backbone');
var constants = require('../constants');
var Todo = require('../Todo/Todo');

var Todos = Backbone.Collection.extend({
  model: Todo,
  url: constants.BASE_URL + '/todos',
});

module.exports = Todos;
