jest.dontMock('../TodoView');
jest.dontMock('../Todo');

describe('Todo', function() {
  var TodoView = require('../TodoView');
  var Todo = require('../Todo');
  var data;
  var view;
  var todo;

  beforeEach(function() {
    data = {
      content: 'test content',
    };

    todo = new Todo(data);
    todo.save = jest.genMockFn();
    TodoView.prototype.listenTo = jest.genMockFn();
    view = new TodoView({ model: todo }).render();
  });

  it('displays the content', function() {
    expect(view.el.textContent).toMatch(data.content);
  });

  it('destroys itself on clicking remove button', function() {
    todo.destroy = jest.genMockFn();
    view.$('.todo__remove').click();
    expect(todo.destroy).toBeCalled();
  });

  it('listens to todo', function() {
    expect(view.listenTo).toBeCalledWith(todo, 'destroy', view.handleDestroy);
    expect(view.listenTo).toBeCalledWith(todo, 'change', view.render);
  });

  it('shows edit input on double click', function() {
    expect(view.$el.hasClass('todo_edit')).toBeFalsy();
    view.$el.dblclick();
    expect(view.$el.hasClass('todo_edit')).toBeTruthy();
    expect(view.$('.todo__edit__input').val()).toBe(data.content);
  });

  it('changes content on submit and disable edit mode', function() {
    var newContent = 'new content';
    view.$el.dblclick();
    view.$('.todo__edit__input').val(newContent);
    view.$('.todo__edit').submit();
    expect(todo.save).toBeCalled();
    expect(view.$el.hasClass('todo_edit')).toBeFalsy();
  });

  it('resumes content on clicking backdrop', function() {
    var newContent = 'new content';
    view.$el.dblclick();
    view.$('.todo__edit__input').val(newContent);
    view.$('.todo__backdrop').click();
    expect(view.$el.hasClass('todo_edit')).toBeFalsy();
  });
});
