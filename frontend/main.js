// import { SocketConnection } from './sock/socket.js';
import { NewElement } from './helpers/elements.js';
import { Menu } from './menu/menu.js';
import { Auth } from './menu/auth.js';

const root = document.querySelector('#root');

const rootContainer = NewElement('div', 'container');

const [loginContainer, loginOrRegister] = Auth()

const menuContainer = Menu();

rootContainer.appendChild(loginContainer);
rootContainer.appendChild(loginOrRegister);

root.appendChild(rootContainer);



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
