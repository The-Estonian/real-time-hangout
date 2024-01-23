import { LoginMenu } from './login.js';
import { RegisterMenu } from './register.js';
import { NewElement } from '../helpers/elements.js';
import { GiveAccess } from '../main.js';
import {
  SendLoginData,
  SendRegisterData,
} from '../backendConnection/connection.js';

export const Auth = () => {
  let serverResponse = null;
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
  registerContainer.childNodes[16].addEventListener('click', (e) => {
    let username = registerContainer.childNodes[1].value;
    let age = registerContainer.childNodes[3].value;
    let gender = registerContainer.childNodes[5].value;
    let firstName = registerContainer.childNodes[7].value;
    let lastName = registerContainer.childNodes[9].value;
    let email = registerContainer.childNodes[11].value;
    let password1 = registerContainer.childNodes[13].value;
    let password2 = registerContainer.childNodes[15].value;

    SendRegisterData(
      username,
      age,
      gender,
      firstName,
      lastName,
      email,
      password1
    )
      .then((data) => {
        // console.log(data);
        if (data.registration === 'success') {
          GiveAccess();
        }
      })
      .catch((error) => console.error(error));
  });
  return [loginContainer, loginOrRegister, serverResponse];
};
