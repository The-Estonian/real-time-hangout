import { NewElement } from '../helpers/elements.js';

export const RegisterMenu = () => {
  const register = NewElement('div', 'container_menu_login');

  // Username -----------------------------------------------------------
  const registerUsernameTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Username'
  );
  const registerUsername = NewElement(
    'input',
    'container_menu_login_credentials'
  );

  // Age -----------------------------------------------------------
  const registerAgeTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Age'
  );
  const registerAge = NewElement('input', 'container_menu_login_credentials');

  // Gender -----------------------------------------------------------
  const registerGenderTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Gender'
  );
  const registerGender = NewElement(
    'input',
    'container_menu_login_credentials'
  );
  // FirstName -----------------------------------------------------------
  const registerFirstNameTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'First Name'
  );
  const registerFirstName = NewElement(
    'input',
    'container_menu_login_credentials'
  );
  // LastName -----------------------------------------------------------
  const registerLastNameTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Last Name'
  );
  const registerLastName = NewElement(
    'input',
    'container_menu_login_credentials'
  );
  // Email -----------------------------------------------------------
  const registerEmailTitle = NewElement(
    'span',
    'container_menu_login_credentials',
    'Email'
  );
  const registerEmail = NewElement(
    'input',
    'container_menu_login_credentials'
  );

  // Password1 -----------------------------------------------------------
  const registerPassword1Title = NewElement(
    'span',
    'container_menu_login_credentials',
    'Password'
  );
  const registerPassword1 = NewElement(
    'input',
    'container_menu_login_credentials'
  );
  // Password2 -----------------------------------------------------------
  const registerPassword2Title = NewElement(
    'span',
    'container_menu_login_credentials',
    'Repeat Password'
  );
  const registerPassword2 = NewElement(
    'input',
    'container_menu_login_credentials'
  );

  // Username -----------------------------------------------------------
  const registerSubmit = NewElement(
    'button',
    'container_menu_login_submit',
    'Register'
  );

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
