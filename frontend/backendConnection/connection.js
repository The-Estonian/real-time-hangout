import { NewElement } from '../helpers/createElement.js';
import { GetCookie } from '../helpers/getCookie.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');
modal.appendChild(spinner);

// Submit Login data and handle
export const SendLoginData = async (username, password) => {
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
    if (root.contains(modal)) {
      root.removeChild(modal);
    }
    throw new Error('Server refused the login!');
  }
};

// Submit Registration data and handle
export const SendRegisterData = async (
  username,
  age,
  gender,
  firstName,
  lastName,
  email,
  password
) => {
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
};

// Get user state and handle
export const GetState = async () => {
  root.appendChild(modal);
  try {
    const response = await fetch('http://localhost:8080/checkstate', {
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
        hash:
          GetCookie('rtForumCookie') == null ? '0' : GetCookie('rtForumCookie'),
      }), // body data type must match "Content-Type" header
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after get state');
    }
    root.removeChild(modal);
    return response.json();
  } catch (err) {
    root.removeChild(modal);
    return 'noCookie';
  }
};

// Submit user post and handle
export const SendNewPost = async (title, post) => {
  root.appendChild(modal);
  try {
    const response = await fetch('http://localhost:8080/newpost', {
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
        title: title,
        post: post,
      }), // body data type must match "Content-Type" header
      credentials: 'include',
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after post');
    }
    root.removeChild(modal);
    return response.json();
  } catch (err) {
    root.removeChild(modal);
    throw new Error('No response after post');
  }
};
