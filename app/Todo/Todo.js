var Backbone = require('backbone');
var constants = require('../constants');

var Todo = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: constants.BASE_URL + '/todos',
});

module.exports = Todo;
