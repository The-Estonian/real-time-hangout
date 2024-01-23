import { NewElement } from '../helpers/elements.js';

const root = document.querySelector('#root');

export const SendLoginData = async (username, password) => {
  const modal = NewElement('div', 'backdrop');
  const spinner = NewElement('div', 'loader');
  modal.appendChild(spinner);
  root.appendChild(modal);
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8080/login';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.responseText);
          root.removeChild(modal);
          resolve(json);
        } else {
          reject(new Error('No response after login'));
        }
      }
    };

    var data = JSON.stringify({ username: username, password: password });
    xhr.send(data);
  });
};

export const SendRegisterData = async (
  username,
  age,
  gender,
  firstName,
  lastName,
  email,
  password
) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8080/register';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.responseText);
          // console.log(json.registration);
          resolve(json);
        } else {
          reject(new Error('No response after registration'));
        }
      }
    };

    var data = JSON.stringify({
      username,
      age,
      gender,
      firstName,
      lastName,
      email,
      password,
    });
    xhr.send(data);
  });
};
