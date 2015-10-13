var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: '/todos',
});

module.exports = Todo;
