import { DeleteCookie } from '../helpers/delCookie.js';
import { GetState } from './getState.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';

export let socket;

export const startSocket = () => {
  socket = new WebSocket('ws://localhost:8080/socket');
};

export const CheckUserState = (
  generateNode = null,
  checkAuthentication = true
) => {
  const container = document.querySelector('.container');
  const menuContent = Menu();
  if (checkAuthentication) {
    GetState().then((data) => {
      if (data['login'] == 'success') {
        if (socket == undefined || socket.readyState === WebSocket.CLOSED) {
          startSocket();
        }
        socket.onopen = (e) => {
          console.log('Socket is open');
          window.addEventListener('beforeunload', function () {
            socket.send(
              JSON.stringify({ type: 'logout', fromuserid: data['userId'] })
            );
          });
        };
        socket.close = (e) => {
          socket.send(
            JSON.stringify({ type: 'logout', fromuserid: data['userId'] })
          );
          socket = undefined;
        };
        if (generateNode != null) {
          container.innerHTML = '';
          container.appendChild(menuContent);
          container.appendChild(generateNode());
        } else {
          return;
        }
      } else if (data['login'] == 'fail') {
        DeleteCookie('rtForumCookie');
        container.innerHTML = '';
        container.appendChild(Auth());
      } else {
        container.innerHTML = '';
        container.appendChild(Auth());
      }
    });
  } else {
    container.innerHTML = '';
    container.appendChild(menuContent);
    if (generateNode != null) {
      container.appendChild(generateNode());
    }
  }
};
