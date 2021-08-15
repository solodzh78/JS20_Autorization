'use strict';

function login(obj) {

  let login = prompt('Введите логин');
  let password = prompt('Введите пароль');
  usersData.forEach(function(item, index) {
    if (item.login === login && item.password === password) {
      userNameSpan.textContent = usersData[index].firstName;
    }
  });

}
function register() {
  let userName = prompt('Введите ваше Имя Фамилию через пробел');
  let strCleared = userName.trim().split(' ').filter(item => item !== '');

  if (strCleared.length === 2) {
    const newUserData = {
      firstName: strCleared[0], lastName: strCleared[1]
    };
    let login = prompt('Введите логин');
    let password = prompt('Введите пароль');
    newUserData.login = login;
    newUserData.password = password;
    newUserData.regDate = new Date().toLocaleString("ru",
      { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    console.log('obj: ', newUserData);
    usersData.push(newUserData);
    refreshLocalStorage();
    render();
  } else {alert('Данные введены не корректно');}
}

const registerBtn = document.getElementById('registerUser');
const loginBtn = document.getElementById('login');
const userNameSpan = document.getElementById('username');
const listUl = document.querySelector('.todo');

registerBtn.addEventListener('click', register);
loginBtn.addEventListener('click', login);

//  Загрузка данных из localStorage ============================================================
let usersData = (JSON.parse(localStorage.getItem('usersData')))
  ? JSON.parse(localStorage.getItem('usersData')) : [];

//  Запись данных в localStorage ============================================================
const refreshLocalStorage = function () {
  localStorage.setItem('usersData', JSON.stringify(usersData));
};

let usersData1 = [
  {
    firstName: '',
    secondName: '',
    login: '',
    password: '',
    regDate: ''
  }
];
// =================================== render ================================================
const render = function () {
  listUl.textContent = '';

  usersData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.setAttribute('regDate', item.regDate);

    li.innerHTML =
      '<span class="text-todo">' + 
      `Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}` +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class=""></button>' +
      '<button class="todo-completed"></button>' +
      '</div>';
    listUl.append(li);

    //  Удаление пользователя =================================================================
    const btnUserRemove = li.querySelector('.todo-completed');
    btnUserRemove.addEventListener('click', function (e) {
      const regDate = e.target.parentElement.parentElement.attributes.regdate.value;

      usersData.forEach(function(item, index) {
        if (item.regDate === regDate) {
          usersData.splice(index, 1);
        }
      });
      refreshLocalStorage();
      render();
    });
  });
};
render();
