import { DeleteCookie } from '../helpers/delCookie.js';
import { GetState } from './getState.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';

export const CheckUserState = (generateNode = null, checkAuthentication = true) => {
  const container = document.querySelector('.container');
  const menuContent = Menu();
    if (checkAuthentication) {
      GetState().then((data) => {
        if (data['login'] == 'success') {
          container.innerHTML = '';
          container.appendChild(menuContent);
          if (generateNode != null) {
            container.appendChild(generateNode());
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
    } else {
      container.innerHTML = '';
      container.appendChild(menuContent);
      if (generateNode != null) {
        container.appendChild(generateNode());
      }
    }
};
