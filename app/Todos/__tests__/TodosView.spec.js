jest.autoMockOff();


describe('TodosView', function() {
  var TodosView = require('../TodosView');
  var Todos = require('../Todos');
  var Todo = require('../../Todo/Todo');
  var todos;
  var data;

  beforeEach(function() {
    data = [
      { id: '0001', content: 'Item 1' },
      { id: '0002', content: 'Item 2' },
      { id: '0003', content: 'Item 3' },
    ];

    todos = new Todos(data);
  });

  it('displays a list of Todo', function() {
    var view = new TodosView({ collection: todos }).render();
    expect(view.$('.todo').length).toBe(data.length);
  });

  it('fetches todos on initialization', function() {
    todos.fetch = jest.genMockFn();
    var view = new TodosView({ collection: todos });
    expect(view.collection.fetch).toBeCalled();
  });

  it('listens to todos', function() {
    TodosView.prototype.listenTo = jest.genMockFn();
    var view = new TodosView({ collection: todos });
    expect(view.listenTo).toBeCalledWith(todos, 'reset', view.render);
    expect(view.listenTo).toBeCalledWith(todos, 'add', view.addTodo);
  });

  it('adds one todo', function() {
    var newData = { content: 'test content' };
    var todo = new Todo(newData);
    var view = new TodosView({ collection: todos }).render();
    view.addTodo(todo);
    expect(view.el.textContent).toMatch(newData.content);
  });
});
