import { NewElement } from '../helpers/createElement.js';

export const GetMessages = async (count) => {
  const root = document.querySelector(
    '.container_messages_users-text_container'
  );
  const modal = NewElement('div', 'messages-backdrop');
  const spinner = NewElement('div', 'messages-hourglass');
  const spinnerContent = NewElement(
    'span',
    'messages-hourglass_text',
    'Fetching previous messages'
  );
  modal.appendChild(spinnerContent);
  modal.appendChild(spinner);
  root.appendChild(modal);
  try {
    const response = await fetch('http://localhost:8080/getmessages', {
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
        count: count,
      }),
      credentials: 'include',
    });
    if (!response.ok) {
      root.removeChild(modal);
      throw new Error('No response after get GetMessages');
    } else {
      root.removeChild(modal);
      return response.json();
    }
  } catch (err) {
    if (root.contains(modal)) {
      root.removeChild(modal);
    }
    return 'Catch error in GetMessages';
  }
};
