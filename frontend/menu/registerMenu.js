import { NewElement } from '../helpers/createElement.js';

export const RegisterMenu = () => {
  let username,
    age,
    gender,
    fname,
    lname,
    email,
    psw = false;
  const register = NewElement('div', 'container_menu_register');
  const registerErrMsg = NewElement(
    'div',
    'container_menu_register_credentials_erro'
  );

  // Submit registration -----------------------------------------------------------
  const registerSubmit = NewElement(
    'button',
    'container_menu_register_submit',
    'Register'
  );
  registerSubmit.setAttribute('disabled', 'true');

  // Username -----------------------------------------------------------
  const registerUsernameTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'Username'
  );
  const registerUsername = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerUsername.setAttribute('type', 'text');

  registerUsername.addEventListener('input', (e) => {
    if (e.target.value.length < 6) {
      registerUsername.classList.add('input-fail');
      registerErrMsg.innerHTML = 'Username must be at least 6 letters long!';
      register.insertBefore(registerErrMsg, register.childNodes[2]);
    } else {
      registerUsername.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
      username = true;
    }
  });

  // Age -----------------------------------------------------------
  const registerAgeTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'Age'
  );
  const registerAge = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerAge.setAttribute('type', 'number');
  registerAge.setAttribute('min', '18');
  registerAge.setAttribute('max', '100');
  registerAge.setAttribute('step', '1');
  registerAge.setAttribute('placeholder', '18+');
  registerAge.setAttribute('required', '');

  registerAge.addEventListener('input', (e) => {
    if (e.target.value < 18 || e.target.value > 100) {
      registerAge.classList.add('input-fail');
      registerErrMsg.innerHTML = 'Age must be between 18 and 100!';
      register.insertBefore(registerErrMsg, register.childNodes[4]);
    } else {
      registerAge.classList.remove('input-fail');
      register.removeChild(registerErrMsg);
      age = true;
    }
  });

  // Gender -----------------------------------------------------------
  const registerGenderTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'Chromosomes'
  );
  const registerGender = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerGender.setAttribute('type', 'text');

  registerGender.addEventListener('input', (e) => {
    if (
      e.target.value != 'XX' &&
      e.target.value != 'XY'
    ) {
      registerGender.classList.add('input-fail');
      registerErrMsg.innerHTML = 'XX or XY';
      register.insertBefore(registerErrMsg, register.childNodes[6]);
    } else {
      registerGender.classList.remove('input-fail');
      register.removeChild(registerErrMsg);
      gender = true;
    }
  });

  // FirstName -----------------------------------------------------------
  const registerFirstNameTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'First Name'
  );
  const registerFirstName = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerFirstName.setAttribute('type', 'text');

  registerFirstName.addEventListener('input', (e) => {
    if (e.target.value.length < 2) {
      registerFirstName.classList.add('input-fail');
      registerErrMsg.innerHTML = 'One letter names not allowed!';
      register.insertBefore(registerErrMsg, register.childNodes[8]);
    } else {
      registerFirstName.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
      fname = true;
    }
  });

  // LastName -----------------------------------------------------------
  const registerLastNameTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'Last Name'
  );
  const registerLastName = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerLastName.setAttribute('type', 'text');

  registerLastName.addEventListener('input', (e) => {
    if (e.target.value.length < 2) {
      registerLastName.classList.add('input-fail');
      registerErrMsg.innerHTML = 'One letter names not allowed!';
      register.insertBefore(registerErrMsg, register.childNodes[10]);
    } else {
      registerLastName.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
      lname = true;
    }
  });

  // Email -----------------------------------------------------------
  const registerEmailTitle = NewElement(
    'span',
    'container_menu_register_credentials',
    'Email'
  );
  const registerEmail = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerEmail.setAttribute('type', 'email');

  registerEmail.addEventListener('input', (e) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!e.target.value.match(mailformat)) {
      registerEmail.classList.add('input-fail');
      registerErrMsg.innerHTML = 'Not a Valid Email!';
      register.insertBefore(registerErrMsg, register.childNodes[12]);
    } else {
      registerEmail.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
      email = true;
    }
  });

  // Password1 -----------------------------------------------------------
  const registerPassword1Title = NewElement(
    'span',
    'container_menu_register_credentials',
    'Password'
  );
  const registerPassword1 = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerPassword1.setAttribute('type', 'password');

  registerPassword1.addEventListener('input', (e) => {
    if (e.target.value.length < 6) {
      registerPassword1.classList.add('input-fail');
      registerErrMsg.innerHTML = 'Password must be at least 6 letters long!';
      register.insertBefore(registerErrMsg, register.childNodes[14]);
    } else {
      registerPassword1.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
    }
  });

  // Password2 -----------------------------------------------------------
  const registerPassword2Title = NewElement(
    'span',
    'container_menu_register_credentials',
    'Repeat Password'
  );
  const registerPassword2 = NewElement(
    'input',
    'container_menu_register_credentials'
  );
  registerPassword2.setAttribute('type', 'password');

  registerPassword2.addEventListener('input', (e) => {
    if (e.target.value != registerPassword1.value) {
      registerPassword2.classList.add('input-fail');
      registerErrMsg.innerHTML = 'Passwords do not match!';
      register.insertBefore(registerErrMsg, register.childNodes[16]);
    } else {
      registerPassword2.classList.remove('input-fail');
      if (register.contains(registerErrMsg)) {
        register.removeChild(registerErrMsg);
      }
      psw = true;
      if (username && age && gender && fname && lname && email && psw) {
        registerSubmit.removeAttribute('disabled');
        registerSubmit.classList.add('accepted');
      }
    }
  });
  registerPassword2.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      registerSubmit.click();
    }
  });

  register.appendChild(registerUsernameTitle);
  register.appendChild(registerUsername);

  register.appendChild(registerAgeTitle);
  register.appendChild(registerAge);

  register.appendChild(registerGenderTitle);
  register.appendChild(registerGender);

  register.appendChild(registerFirstNameTitle);
  register.appendChild(registerFirstName);

  register.appendChild(registerLastNameTitle);
  register.appendChild(registerLastName);

  register.appendChild(registerEmailTitle);
  register.appendChild(registerEmail);

  register.appendChild(registerPassword1Title);
  register.appendChild(registerPassword1);

  register.appendChild(registerPassword2Title);
  register.appendChild(registerPassword2);

  register.appendChild(registerSubmit);
  return register;
};
