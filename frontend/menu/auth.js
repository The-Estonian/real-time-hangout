import { LoginMenu } from './login.js';
import { RegisterMenu } from './register.js';
import { NewElement } from '../helpers/elements.js';
import { SendLoginData } from "../backendConnection/connection.js"
export const Auth = () => {
  const loginContainer = LoginMenu();
  const registerContainer = RegisterMenu();
  const loginOrRegister = NewElement(
    'button',
    'container_menu_login_submit',
    'Not registered? Click me!'
  );

  const loginRegisterSwitch = (e) => {
    if (e.target.textContent == 'Login instead!') {
      registerContainer.replaceWith(loginContainer);
      loginOrRegister.textContent = 'Not registered? Click me!';
    } else {
      loginContainer.replaceWith(registerContainer);
      loginOrRegister.textContent = 'Login instead!';
    }
  };
  loginOrRegister.addEventListener('click', loginRegisterSwitch);
  loginContainer.childNodes[4].addEventListener('click', (e) => {
    let userName = loginContainer.childNodes[1].value;
    let password = loginContainer.childNodes[3].value;
    console.log('Username: ', userName);
    console.log('Password: ', password);
    SendLoginData(userName, password);
  });
  registerContainer.childNodes[4].addEventListener('click', (e) => {
    console.log('click');
  });
  return [loginContainer, loginOrRegister];
};
