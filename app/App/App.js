var Backbone = require('backbone');
var template = require('./App.jade');
var Todos = require('../Todos/Todos');
var TodosView = require('../Todos/TodosView');

require('./styles.css');

var App = Backbone.View.extend({
  events: {
    'submit .main__new-todo-container': 'handleSubmit',
    'click .main__add-todo': 'handleToggleMode',
  },

  initialize: function() {
    this.todos = new Todos();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var content = this.$input.val();
    if (content.trim()) {
      this.todos.create({ content: content });
      this.toggleMode();
      this.$input.val('');
    }
  },

  handleToggleMode: function() {
    this.toggleMode();
  },

  toggleMode: function() {
    this.$form.toggleClass('main__new-todo-container_open');
    this.$addTodo.toggleClass('main__add-todo_rotated');
  },

  render: function() {
    this.$el.html(template());
    this.$input = this.$('.main__new-todo-container__input');
    this.$form = this.$('.main__new-todo-container');
    this.$addTodo = this.$('.main__add-todo');

    var todosView = new TodosView({ collection: this.todos });
    this.$('.main').append(todosView.render().el);
    return this;
  },
});

module.exports = App;
