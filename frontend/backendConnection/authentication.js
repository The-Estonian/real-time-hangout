import { GetCookie } from '../helpers/getCookie.js';
import { GetState } from './connection.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';
import { NewElement } from '../helpers/createElement.js';

export const AuthenticateUser = () => {
  const root = document.querySelector('#root');
  const content = Menu();
  const rootContainer = NewElement('div', 'container');
  const [loginContainer, loginOrRegister] = Auth();
  rootContainer.appendChild(loginContainer);
  rootContainer.appendChild(loginOrRegister);
  if (!(root.contains(rootContainer) || root.contains(content))) {
    root.appendChild(rootContainer);
  }
  let getCookie = GetCookie('rtForumCookie');
  if (getCookie != undefined) {
    GetState(getCookie).then((data) => {
      if (data['login'] == 'success') {
        rootContainer.replaceWith(content);
      }
    });
  } else {
    content.replaceWith(rootContainer);
  }
};
