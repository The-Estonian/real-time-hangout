import { NewElement } from '../helpers/elements.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');

export const SendLoginData = async (username, password) => {
  modal.appendChild(spinner);
  root.appendChild(modal);
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username, password }), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after login');
    }
    root.removeChild(modal);
    return response.json();
  } catch (err) {
    root.removeChild(modal);
    throw new Error('No response after login');
  }
  // return new Promise((resolve, reject) => {
  // var xhr = new XMLHttpRequest();
  // var url = 'http://localhost:8080/login';
  // xhr.open('POST', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');

  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4) {
  //     if (xhr.status === 200) {
  //       let json = JSON.parse(xhr.responseText);
  //       root.removeChild(modal);
  //       resolve(json);
  //     } else {
  //       reject(new Error('No response after login'));
  //       root.removeChild(modal);
  //     }
  //   }
  // };
  // var data = JSON.stringify({ username: username, password: password });
  // xhr.send(data);
  // });
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
  modal.appendChild(spinner);
  root.appendChild(modal);

  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username,
        age,
        gender,
        firstName,
        lastName,
        email,
        password,
      }), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after register');
    }
    root.removeChild(modal);
    return response.json();
  } catch (err) {
    root.removeChild(modal);
    throw new Error('No response after register');
  }
  // return new Promise((resolve, reject) => {
  //   var xhr = new XMLHttpRequest();
  //   var url = 'http://localhost:8080/register';
  //   xhr.open('POST', url, true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');

  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         let json = JSON.parse(xhr.responseText);
  //         root.removeChild(modal);
  //         resolve(json);
  //       } else {
  //         reject(new Error('No response after registration'));
  //       }
  //     }
  //   };

  //   var data = JSON.stringify({
  //     username,
  //     age,
  //     gender,
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   });
  //   xhr.send(data);
  // });
};
