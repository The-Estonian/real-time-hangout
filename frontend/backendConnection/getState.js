import { NewElement } from '../helpers/createElement.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');
const spinnerContent = NewElement('span', 'loader_text', 'Checking State');
spinner.appendChild(spinnerContent);
modal.appendChild(spinner);

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
      credentials: 'include'
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after get state');
    }
    root.removeChild(modal);
    return response.json();
  } catch (err) {
    console.log("Error in GetState");
    root.removeChild(modal);
    return 'noCookie';
  }
};
