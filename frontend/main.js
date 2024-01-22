// import { SocketConnection } from './sock/socket.js';
import { NewElement } from './helpers/elements.js';
import { Menu } from './menu/menu.js';
import { LoginMenu } from './menu/login.js';
import { RegisterMenu } from './menu/register.js';

const root = document.querySelector('#root');
const rootContainer = NewElement('div', 'container');
const loginOrRegister = NewElement(
  'button',
  'container_menu_login_submit',
  'Not registered? Click me!'
);
const menuContainer = Menu();
const loginContainer = LoginMenu();
const registerContainer = RegisterMenu();

const loginRegisterSwitch = (e) => {
  console.log(e);
  if (e.target.textContent == 'Login instead!') {
    rootContainer.removeChild(registerContainer);
    rootContainer.removeChild(loginOrRegister);
    rootContainer.appendChild(loginContainer);
    loginOrRegister.textContent = 'Not registered? Click me!';
    rootContainer.appendChild(loginOrRegister);
  } else {
    rootContainer.removeChild(loginContainer);
    rootContainer.removeChild(loginOrRegister);
    rootContainer.appendChild(registerContainer);
    loginOrRegister.textContent = 'Login instead!';
    rootContainer.appendChild(loginOrRegister);
  }
};

rootContainer.appendChild(loginContainer);
rootContainer.appendChild(loginOrRegister);
root.appendChild(rootContainer);
loginOrRegister.addEventListener('click', loginRegisterSwitch);
loginContainer.childNodes[4].addEventListener("click", loginUser)
// const socket = SocketConnection();
// const connectionButton = document.createElement('button');
// connectionButton.textContent = 'Connect!';
// connectionButton.classList.add('connectionButton');
// root.appendChild(connectionButton);

// const textInput = document.createElement('input');
// textInput.setAttribute('type', 'text');
// textInput.classList.add('connectionButton');
// root.appendChild(textInput);

// const textSubmit = document.createElement('input');
// textSubmit.setAttribute('type', 'submit');
// textSubmit.classList.add('connectionButton');
// root.appendChild(textSubmit);

// const textWindow = document.createElement('div');
// textWindow.classList.add('terminalWindow');
// textWindow.innerHTML = 'Empty';
// root.appendChild(textWindow);

// textSubmit.addEventListener('click', (e) => {
//   console.log(textInput.value);
//   socket.send(textInput.value);
//   socket.onmessage = (msg) => {
//     console.log(msg.data);
//     textWindow.innerHTML = msg.data;
//   }
// });
