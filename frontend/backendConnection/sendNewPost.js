import { NewElement } from '../helpers/createElement.js';

const root = document.querySelector('#root');
const modal = NewElement('div', 'backdrop');
const spinner = NewElement('div', 'loader');
modal.appendChild(spinner);

// Submit user post and handle
export const SendNewPost = async (title, post, categories) => {
  // console.log(JSON.stringify(categories));
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
        categories: JSON.stringify(categories),
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
    // root.removeChild(modal);
    throw new Error('No response after post');
  }
};
