import { LoginMenu } from './login.js';
import { RegisterMenu } from './register.js';
import { NewElement } from '../helpers/elements.js';
import { GiveAccess } from '../main.js';
import {
  SendLoginData,
  SendRegisterData,
} from '../backendConnection/connection.js';

export const Auth = () => {
  const loginContainer = LoginMenu();
  const registerContainer = RegisterMenu();
  const loginOrRegister = NewElement(
    'button',
    'container_menu_login_submit',
    'Not registered? Click me!'
  );

  // switch between login and register
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

  // switch to send login user data to server and return login data
  loginContainer.childNodes[4].addEventListener('click', (e) => {
    let userName = loginContainer.childNodes[1].value;
    let password = loginContainer.childNodes[3].value;
    let loginUnsuccess = NewElement(
      'span',
      'container_menu_login_credentials_erro'
    );
    if (loginContainer.contains(loginContainer.childNodes[5])) {
      loginContainer.removeChild(loginContainer.childNodes[5]);
    }
    SendLoginData(userName, password)
      .then((data) => {
        console.log(data);
        if (data.login === 'success') {
          if (loginContainer.contains(loginUnsuccess)) {
            loginContainer.removeChild(loginUnsuccess);
          }
          GiveAccess();
        } else if (data.login === 'usernameError') {
          loginUnsuccess.innerHTML = 'User does not exist!';
          loginContainer.appendChild(loginUnsuccess);
        } else if (data.login === 'userPwNoMatch') {
          loginUnsuccess.innerHTML = 'Username and Password do not match!';
          loginContainer.appendChild(loginUnsuccess);
        }
      })
      .catch((error) => console.error(error));
  });

  // switch to send register user data to server and return register data
  const registerSubmit = registerContainer.querySelector(
    '.container_menu_register_submit'
  );
  registerSubmit.addEventListener('click', (e) => {
    let username = registerContainer.childNodes[1].value;
    let age = registerContainer.childNodes[3].value;
    let gender = registerContainer.childNodes[5].value;
    let firstName = registerContainer.childNodes[7].value;
    let lastName = registerContainer.childNodes[9].value;
    let email = registerContainer.childNodes[11].value;
    let password = registerContainer.childNodes[13].value;
    SendRegisterData(
      username,
      age,
      gender,
      firstName,
      lastName,
      email,
      password
    )
      .then((data) => {
        console.log(data);
        if (data.registration === 'success') {
          loginOrRegister.dispatchEvent(new Event('click'));
          let registrationSuccess = NewElement(
            'span',
            'container_menu_login_credentials',
            'Registration success, Please login!'
          );
          loginContainer.appendChild(registrationSuccess);
        }
      })
      .catch((error) => console.error(error));
  });
  return [loginContainer, loginOrRegister];
};
