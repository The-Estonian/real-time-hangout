import { Forum } from './pages/forum.js';
import './main.css';
import { NewElement } from './helpers/createElement.js';

import { Auth } from './menu/auth.js';
import { CheckUserState } from './backendConnection/checkState.js';

const root = document.querySelector('#root');
export const socket = new WebSocket('ws://localhost:8080/socket');

socket.onopen = (e) => {
  console.log('SOCKET OPEN');
  // socket.send(JSON.stringify({ user: currentUser.Id, status: 'online' }));
};

root.appendChild(Auth());
// check user state
CheckUserState(Forum);
