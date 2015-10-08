var $ = require('jquery');
var Backbone = require('backbone');
var TodoView = require('../Todo/TodoView');

require('./styles.css');

var TodosView = Backbone.View.extend({
  tagName: 'ul',

  className: 'todos',

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
    var $tmp = $('<div />');
    this.collection.each(function(todo) {
      var todoView = new TodoView({ model: todo });
      $tmp.append(todoView.render().el);
    });
    this.$el.html($tmp.children());
    return this;
  },
});

module.exports = TodosView;
