import { NewElement } from '../helpers/createElement.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');
const spinnerContent = NewElement('span', 'loader_text', 'Fetching Users');
spinner.appendChild(spinnerContent);
modal.appendChild(spinner);

export const GetUsers = async () => {
  root.appendChild(modal);
  try {
    const response = await fetch('http://localhost:8080/getusers', {
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
      credentials: 'include',
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after GetUsers');
    } else {
      root.removeChild(modal);
      return response.json();
    }
  } catch (err) {
    console.log('Got error in GetUsers catch');
    if (root.contains(modal)) {
      root.removeChild(modal);
    }
    return 'Authentication failed';
  }
};
