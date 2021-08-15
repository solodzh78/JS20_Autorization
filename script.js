'use strict';

function login(obj) {

  let login = prompt('Введите логин');
  let password = prompt('Введите пароль');
  for (let i = 0; i < usersData.length; i++) {
    if (usersData[i].login === login && usersData[i].password === password) {
      userNameSpan.textContent = usersData[i].firstName;
      return;
    } 
  }
  alert('Логин или пароль введены не верно');
}
function register() {
  let userName = prompt('Введите ваше Имя Фамилию через пробел');
  let strCleared = userName.trim().split(' ').filter(item => item !== '');

  if (strCleared.length === 2) {
    const newUserData = {
      firstName: strCleared[0], lastName: strCleared[1]
    };
    let login;
    do {
      login = prompt('Введите логин');
      if (login === null) {
        return;
      }
    } while (checkLogin(login));
    let password = prompt('Введите пароль');
    if (password === null) {
      return;
    }
    newUserData.login = login;
    newUserData.password = password;
    newUserData.regDate = new Date().toLocaleString("ru",
      { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    usersData.push(newUserData);
    refreshLocalStorage();
    render();
  } else {alert('Данные введены не корректно');}
}
function checkLogin(login) {
  for (let i = 0; i< usersData.length; i++) {
    if (login === usersData[i].login){
      alert('Пользователь с таким логином уже существует');
      return true;
    }
  }
  return false;
}

const registerBtn = document.getElementById('registerUser');
const loginBtn = document.getElementById('login');
const userNameSpan = document.getElementById('username');
const listUl = document.querySelector('.list');

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
    li.classList.add('list-item');
    li.setAttribute('regDate', item.regDate);

    li.innerHTML =
      '<span class="list-text">' +
      `Имя: ${item.firstName}, фамилия: ${item.lastName}, зарегистрирован: ${item.regDate}` +
      '</span>' +
      '<button class="list-remove"></button>';
    listUl.append(li);

    //  Удаление пользователя =================================================================
    const btnUserRemove = li.querySelector('.list-remove');
    btnUserRemove.addEventListener('click', function (e) {
      const regDate = e.target.parentElement.attributes.regdate.value;

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
