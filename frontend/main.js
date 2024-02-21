import { Forum } from './pages/forum.js';
import './main.css';

import { Auth } from './menu/auth.js';
import { CheckUserState } from './backendConnection/checkState.js';

const root = document.querySelector('#root');



root.appendChild(Auth());
// check user state
CheckUserState(Forum);
