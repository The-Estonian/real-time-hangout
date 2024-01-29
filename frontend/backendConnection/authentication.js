import { GetCookie } from '../helpers/getCookie.js';
import { DeleteCookie } from '../helpers/delCookie.js';
import { GetState } from './connection.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';

export const AuthenticateUser = () => {
  const root = document.querySelector('#root');
  const content = Menu();
  let getCookie = GetCookie('rtForumCookie');
  if (getCookie != undefined) {
    GetState(getCookie).then((data) => {
      if (data['login'] == 'success') {
        root.childNodes[0].removeChild(root.childNodes[0].childNodes[1]);
        root.childNodes[0].childNodes[0].replaceWith(content);
      } else if (data['login'] == 'fail' && data['user'] == 'logout') {
        DeleteCookie('rtForumCookie');
      }
    });
  } else {
    root.childNodes[0].replaceWith(Auth());
  }
};
