var Backbone = require('backbone');
var template = require('./TodoView.jade');

require('./styles.css');

var TodoView = Backbone.View.extend({
  tagName: 'li',

  className: 'todo',

  events: {
    'dblclick': 'handleToggleMode',
    'click .todo__remove': 'handleRemove',
    'submit .todo__edit': 'handleSubmit',
    'click .todo__backdrop': 'handleResume',
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
  },

  handleToggleMode: function() {
    this.$input.val(this.model.get('content'));
    this.$el.addClass('todo_edit');
  },

  handleRemove: function() {
    this.model.destroy();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var newContent = this.$input.val();
    this.model.save({
      content: newContent,
    });
    this.resume();
  },

  handleResume: function() {
    this.resume();
  },

  resume: function() {
    this.$el.removeClass('todo_edit');
  },

  render: function() {
    this.$el.html(template(this.model.attributes));
    this.$input = this.$('.todo__edit__input');
    return this;
  },
});

module.exports = TodoView;
