import { DeleteCookie } from '../helpers/delCookie.js';
import { GetState } from './getState.js';
import { Menu } from '../menu/menu.js';
import { Auth } from '../menu/auth.js';
import { NewElement } from '../helpers/createElement.js';

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
        const setUsername = NewElement(
          'span',
          'container_menu_button_username',
          data['username']
        );
        menuContent.insertBefore(setUsername, menuContent.lastChild);
        if (socket == undefined || socket.readyState === WebSocket.CLOSED) {
          console.log('Starting new socket');
          startSocket();
        }
        if (socket.readyState === WebSocket.OPEN) {
          console.log('Sending online status');
          socket.send(
            JSON.stringify({
              type: 'onlineStatus',
              status: 'online',
            })
          );
        } else {
          socket.onopen = (e) => {
            console.log('Sending online status');
            socket.send(
              JSON.stringify({
                type: 'onlineStatus',
                status: 'online',
              })
            );
            window.addEventListener('beforeunload', function () {
              socket.send(
                JSON.stringify({
                  type: 'logout',
                  status: 'offline',
                  fromuserid: data['userId'],
                })
              );
            });
          };
        }
        socket.close = (e) => {
          socket.send(
            JSON.stringify({
              type: 'logout',
              status: 'offline',
              fromuserid: data['userId'],
            })
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
