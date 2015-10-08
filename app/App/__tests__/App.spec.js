jest.autoMockOff();

describe('App', function() {
  var App = require('../App');
  var view;

  beforeEach(function() {
    view = new App().render();
  });

  it('has todos', function() {
    expect(view.$('.todos').length).toBeTruthy();
  });

  it('calls Todo.create on form submit', function() {
    expect(view.todos).toBeDefined();
    view.todos.create = jest.genMockFn();
    view.toggleMode = jest.genMockFn();
    var testContent = 'test content';
    view.$('.main__new-todo-container__input').val(testContent);
    view.$('.main__new-todo-container').submit();
    expect(view.todos.create).toBeCalledWith({ content: testContent });
    expect(view.toggleMode).toBeCalled();
    expect(view.$('.main__new-todo-container__input').val()).toBe('');
  });

  it('should not add todo when input is empty', function() {
    view.todos.create = jest.genMockFn();
    view.$('.main__new-todo-container').submit();
    expect(view.todos.create).not.toBeCalled();
  });

  it('toggles mode on clicking add-todo button', function() {
    expect(view.$('.main__new-todo-container_open').length > 0).toBeFalsy();
    expect(view.$('.main__add-todo_rotated').length > 0).toBeFalsy();

    view.$('.main__add-todo').click();

    expect(view.$('.main__new-todo-container_open').length > 0).toBeTruthy();
    expect(view.$('.main__add-todo_rotated').length > 0).toBeTruthy();

    view.$('.main__add-todo').click();

    expect(view.$('.main__new-todo-container_open').length > 0).toBeFalsy();
    expect(view.$('.main__add-todo_rotated').length > 0).toBeFalsy();
  });
});
