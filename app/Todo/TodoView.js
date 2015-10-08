var Backbone = require('backbone');
var template = require('./TodoView.jade');

require('./styles.css');

var ANIMATION_END_EVENT = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
var EDIT_MODE_CLASS = 'todo_edit';
var ENTER_CLASS = 'todo-enter';
var ENTER_ACTIVE_CLASS = ENTER_CLASS + '-active';
var LEAVE_CLASS = 'todo-leave';
var LEAVE_ACTIVE_CLASS = LEAVE_CLASS + '-active';


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
    this.listenTo(this.model, 'destroy', this.handleDestroy);
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

  handleDestroy: function() {
    var self = this;
    var $el = this.$el;
    $el.addClass('todo-leave');
    $el.one(ANIMATION_END_EVENT, function() {
      self.remove();
    });
    setTimeout(function() {
      $el.addClass(LEAVE_ACTIVE_CLASS);
    }, 0);
  },

  resume: function() {
    this.$el.removeClass(EDIT_MODE_CLASS);
  },

  render: function() {
    var $el = this.$el;
    $el.html(template(this.model.attributes));
    this.$input = this.$('.todo__edit__input');
    $el.addClass('todo-enter');
    $el.one(ANIMATION_END_EVENT, function() {
      $el.removeClass(ENTER_CLASS + ' ' + ENTER_ACTIVE_CLASS);
    });
    setTimeout(function() {
      $el.addClass(ENTER_ACTIVE_CLASS);
    }, 0);
    return this;
  },
});

module.exports = TodoView;
