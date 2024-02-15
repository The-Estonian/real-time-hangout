import { NewElement } from '../helpers/createElement.js';
import { DeleteCookie } from '../helpers/delCookie.js';
import { CheckUserState } from '../backendConnection/checkState.js';
import { NewPost } from '../pages/newPost.js';
import { Forum } from '../pages/forum.js';
import { Messages } from '../pages/messages.js';

export const Menu = () => {
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
  const menuMessageButton = NewElement(
    'button',
    'container_menu_button',
    'Messages'
  );

  menuContainer.appendChild(menuForumButton);
  menuContainer.appendChild(menuNewPostButton);
  menuContainer.appendChild(menuMessageButton);
  menuContainer.appendChild(menuLogoutButton);

  menuForumButton.addEventListener('click', (e) => {
    CheckUserState(Forum, true);
  });
  
  menuLogoutButton.addEventListener('click', (e) => {
    DeleteCookie('rtForumCookie');
    CheckUserState();
  });
  menuNewPostButton.addEventListener('click', () => {
    CheckUserState(NewPost, true);
  });

  menuMessageButton.addEventListener("click", ()=> {
    CheckUserState(Messages, true);
  })

  return menuContainer;
};

// "abc <script>alert(1)<" + "/script> def"
