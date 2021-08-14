'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
//  Загрузка данных из localStorage ============================================================
const todoData = (JSON.parse(localStorage.getItem('todoData')))
  ? JSON.parse(localStorage.getItem('todoData')) : [];

//  Запись данных в localStorage ============================================================
const refreshLocalStorage = function () {
  localStorage.setItem('todoData', JSON.stringify(todoData));
};
//  Отрисовка ================================================================================
const render = function () {

  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');
    // Изменение статуса задания ====================================================================
    btnTodoCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      refreshLocalStorage();
      render();
    });
    //  Удаление задания ============================================================================
    btnTodoRemove.addEventListener('click', function (e) {

      const obj = {
        value: e.target.parentNode.parentNode.childNodes[0].textContent,
        completed: e.target.parentElement.parentElement.parentElement.id === 'todo'
          ? false : true
      };

      let objIndex;
      todoData.forEach(function (item, index) {
        if (JSON.stringify(item) === JSON.stringify(obj)) {
          objIndex = index;
        }
      });

      todoData.splice(objIndex, 1);
      refreshLocalStorage();

      render();
    });
  });
};
// Добавление задания ============================================================================
todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);
    headerInput.value = '';
    refreshLocalStorage();
    render();
  }
});

render();
© 2021 GitHub, Inc.