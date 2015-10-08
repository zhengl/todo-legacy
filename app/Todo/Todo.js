var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: 'http://localhost:3000/todos',
});

module.exports = Todo;
