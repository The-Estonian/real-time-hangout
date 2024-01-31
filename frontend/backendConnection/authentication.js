import { GetCookie } from '../helpers/getCookie.js';
import { DeleteCookie } from '../helpers/delCookie.js';
import { GetState } from './connection.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';

export const AuthenticateUser = (node = null) => {
  const container = document.querySelector('.container');
  const menuContent = Menu();

  GetState().then((data) => {
    console.log(data);
    if (data['login'] == 'success') {
      console.log('Logged in!');
      container.innerHTML = '';
      container.appendChild(menuContent);
      if (node != null) {
        container.appendChild(node);
      }
    } else if (data['login'] == 'fail') {
      DeleteCookie('rtForumCookie');
      container.innerHTML = '';
      container.appendChild(Auth());
    } else {
      container.innerHTML = '';
      container.appendChild(Auth());
    }
  });
};
