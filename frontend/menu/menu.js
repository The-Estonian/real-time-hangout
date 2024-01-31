import { NewElement } from '../helpers/createElement.js';
import { DeleteCookie } from '../helpers/delCookie.js';
import { AuthenticateUser } from '../backendConnection/authentication.js';
import { NewPost } from '../pages/newPost.js';
import { Forum } from '../pages/forum.js';

export const Menu = () => {
  const container = document.querySelector('.container');
  const menuContainer = NewElement('div', 'container_menu');
  const menuForumButton = NewElement(
    'button',
    'container_menu_button',
    'Forum'
  );

  const menuLogoutButton = NewElement(
    'button',
    'container_menu_button_log',
    'Logout'
  );

  const menuNewPostButton = NewElement(
    'button',
    'container_menu_button',
    'New Post'
  );

  menuContainer.appendChild(menuForumButton);
  menuContainer.appendChild(menuNewPostButton);
  menuContainer.appendChild(menuLogoutButton);

  menuForumButton.addEventListener('click', (e) => {
    AuthenticateUser(Forum());
  });

  menuLogoutButton.addEventListener('click', (e) => {
    DeleteCookie('rtForumCookie');
    AuthenticateUser();
  });
  menuNewPostButton.addEventListener('click', () => {
    AuthenticateUser(NewPost());
  });

  return menuContainer;
};

// "abc <script>alert(1)<" + "/script> def"
