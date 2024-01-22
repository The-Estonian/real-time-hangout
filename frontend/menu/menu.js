import { NewElement } from '../helpers/elements.js';
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

  menuContainer.appendChild(menuForumButton);
  menuContainer.appendChild(menuNewPostButton);
  menuContainer.appendChild(menuLogoutButton);
  return menuContainer;
};
