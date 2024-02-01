import { NewElement } from '../helpers/createElement.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');
modal.appendChild(spinner);

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
