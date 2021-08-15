'use strict';

const registerBtn = document.getElementById('registerUser');
const loginBtn = document.getElementById('login');
const userNameSpan = document.getElementById('username');
const listUl = document.querySelector('.list');

const AppData = function() {
  this.usersData = [];
};

AppData.prototype.login = function(obj) {
  let login = prompt('Введите логин');
  let password = prompt('Введите пароль');
  for (let i = 0; i < this.usersData.length; i++) {
    if (this.usersData[i].login === login && this.usersData[i].password === password) {
      userNameSpan.textContent = this.usersData[i].firstName;
      return;
    } 
  }
  alert('Логин или пароль введены не верно');
};
AppData.prototype.register = function() {
  let userName = prompt('Введите ваше Имя Фамилию через пробел');
  let strCleared = userName.trim().split(' ').filter(item => item !== '');

  if (strCleared.length === 2) {
    const newUserData = {
      firstName: strCleared[0], lastName: strCleared[1]
    };
    console.log('register', this);
    let login;
    do {
      login = prompt('Введите логин');
      if (login === null) {
        return;
      }
    } while (this.checkLogin(login));
    let password = prompt('Введите пароль');
    if (password === null) {
      return;
    }
    newUserData.login = login;
    newUserData.password = password;
    newUserData.regDate = new Date().toLocaleString("ru",
      { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    this.usersData.push(newUserData);
    this.refreshLocalStorage();
    this.render();
  } else {alert('Данные введены не корректно');}
};
AppData.prototype.checkLogin = function(login) {
  for (let i = 0; i< this.usersData.length; i++) {
    if (login === this.usersData[i].login){
      alert('Пользователь с таким логином уже существует');
      return true;
    }
  }
  return false;
};
AppData.prototype.addListerers = function() {
  const _this = this;
  console.log('addList: ', this);
  registerBtn.addEventListener('click', _this.register.bind(_this));
  loginBtn.addEventListener('click', _this.login.bind(_this));
};
//  Загрузка данных из localStorage ============================================================
AppData.prototype.loadFromLocalStorage = function() {
  this.usersData = (JSON.parse(localStorage.getItem('usersData')))
    ? JSON.parse(localStorage.getItem('usersData')) : [];
};
//  Запись данных в localStorage ============================================================
AppData.prototype.refreshLocalStorage = function () {
  localStorage.setItem('usersData', JSON.stringify(this.usersData));
};
// =================================== render ================================================
AppData.prototype.render = function () {
  listUl.textContent = '';
  this.usersData.forEach(function (item) {
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
    const _this = this;
    const btnUserRemove = li.querySelector('.list-remove');
    btnUserRemove.addEventListener('click', _this.removeUser.bind(_this));
  }, this);
};
AppData.prototype.removeUser = function(e) {
  const regDate = e.target.parentElement.attributes.regdate.value;
  this.usersData.forEach(function (item, index) {
    if (item.regDate === regDate) {
      this.usersData.splice(index, 1);
    }
  }, this);
  this.refreshLocalStorage();
  this.render();
};
AppData.prototype.init = function() {
  this.loadFromLocalStorage();
  this.addListerers();
  this.render();
};

const appData = new AppData();
console.log('appData: ', appData);
appData.init();