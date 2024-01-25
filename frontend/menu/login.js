import { NewElement } from '../helpers/elements.js';

export const LoginMenu = () => {
  const login = NewElement('div', 'container_menu_login');
  const loginErrMsg = NewElement(
    'div',
    'container_menu_login_credentials_erro'
  );

  // Username -----------------------------------------------------------
  const loginUsernameTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Username'
  );
  const loginUsername = NewElement('input', 'container_menu_login_credentials');
  loginUsername.setAttribute('type', 'text');
  loginUsername.addEventListener('input', (e) => {
    if (e.target.value.length < 6) {
      loginUsername.classList.add('input-fail');
      loginErrMsg.innerHTML = 'Username must be at least 6 letters long!';
      login.insertBefore(loginErrMsg, login.childNodes[2]);
    } else {
      loginUsername.classList.remove('input-fail');
      if (login.contains(loginErrMsg)) {
        login.removeChild(loginErrMsg);
      }
    }
  });

  // Password -----------------------------------------------------------
  const loginPasswordTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Password'
  );
  const loginPassword = NewElement('input', 'container_menu_login_credentials');
  loginPassword.setAttribute('type', 'password');
  loginPassword.addEventListener('input', (e) => {
    if (e.target.value.length < 6) {
      loginPassword.classList.add('input-fail');
      loginErrMsg.innerHTML = 'Password must be at least 6 letters long!';
      login.insertBefore(loginErrMsg, login.childNodes[5]);
    } else {
      loginPassword.classList.remove('input-fail');
      if (login.contains(loginErrMsg)) {
        login.removeChild(loginErrMsg);
      }
    }
  });

  // Submit -----------------------------------------------------------
  const loginSubmit = NewElement(
    'button',
    'container_menu_login_submit',
    'Login'
  );

  login.appendChild(loginUsernameTitle);
  login.appendChild(loginUsername);
  login.appendChild(loginPasswordTitle);
  login.appendChild(loginPassword);
  login.appendChild(loginSubmit);
  return login;
};
