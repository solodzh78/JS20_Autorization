'use strict';

function login(obj) {

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
const usernameSpan = document.getElementById('username');
const listUl = document.getElementById('list');

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

  usersData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('user-item');

    li.innerHTML =
      '<span class="text-user">' + 
      `Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}` +
      '</span>' +
      '<div class="user-buttons">' +
      '<button class="user-remove"></button>' +
      '</div>';
    listUl.append(li);

    const btnUserRemove = li.querySelector('.user-remove');

    //  Удаление пользователя =================================================================
    btnUserRemove.addEventListener('click', function (e) {
/*       const obj = {
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

      render(); */
      console.log("Нажата кнопка удаления");
    });
  });
};
render();
