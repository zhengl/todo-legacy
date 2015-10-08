var $ = require('jquery');
var Backbone = require('backbone');
var template = require('./TodosView.jade');
var TodoView = require('../Todo/TodoView');

require('./styles.css');

var TodosView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.addTodo);
    this.collection.fetch();
  },

  addTodo: function(todo) {
    var todoView = new TodoView({ model: todo });
    this.$el.prepend(todoView.render().el);
  },

  render: function() {
    var $element = $(template());
    this.collection.each(function(todo) {
      var todoView = new TodoView({ model: todo });
      $element.append(todoView.render().el);
    });
    this.$el.html($element);
    return this;
  },
});

module.exports = TodosView;
