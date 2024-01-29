import { NewElement, LoadContainer } from '../helpers/createElement.js';
import { DeleteCookie } from '../helpers/delCookie.js';
import { AuthenticateUser } from '../backendConnection/authentication.js';
import { NewPost } from "../pages/newPost.js"

export const Menu = () => {
  const menuContainer = NewElement('div', 'container_menu');
  const menuForumButton = NewElement('a', 'container_menu_button', 'Forum');
  menuForumButton.href = './';

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

  menuNewPostButton.addEventListener('click', () => {
    LoadContainer(NewPost());
  });

  menuContainer.appendChild(menuForumButton);
  menuContainer.appendChild(menuNewPostButton);
  menuContainer.appendChild(menuLogoutButton);

  menuLogoutButton.addEventListener('click', (e) => {
    DeleteCookie('rtForumCookie');
    AuthenticateUser();
  });

  return menuContainer;
};


// "abc <script>alert(1)<" + "/script> def"