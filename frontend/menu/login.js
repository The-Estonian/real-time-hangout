import { NewElement } from '../helpers/elements.js';

export const LoginMenu = () => {
    const login = NewElement('div', 'container_menu_login');
    const loginUsernameTitle = NewElement('span', 'container_menu_login_credentials', "Username");
    const loginUsername = NewElement('input', 'container_menu_login_credentials');
    const loginPasswordTitle = NewElement('span', 'container_menu_login_credentials', "Password");
    const loginPassword = NewElement('input', 'container_menu_login_credentials');
    loginPassword.setAttribute("type", "password")
    const loginSubmit = NewElement('button', 'container_menu_login_submit', "Login");

    login.appendChild(loginUsernameTitle);
    login.appendChild(loginUsername)
    login.appendChild(loginPasswordTitle);
    login.appendChild(loginPassword);
    login.appendChild(loginSubmit);
    return login;
};
