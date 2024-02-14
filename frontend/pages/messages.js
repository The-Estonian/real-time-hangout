import { NewElement } from '../helpers/createElement';
import { GetUsers } from '../backendConnection/getUsers';

export const Messages = () => {
  const messagesContainer = NewElement('div', 'container_messages');
  const messagesUsersText = NewElement('div', 'container_messages_users-text');

  const messagesUsers = NewElement(
    'div',
    'container_messages_users-text_users'
  );
  const messagesTextContainer = NewElement(
    'div',
    'container_messages_users-text_container'
  );
  const messagesText = NewElement('div', 'container_messages_users-text_text');
  const messagesTextInputRow = NewElement(
    'div',
    'container_messages_users-text_container_row'
  );
  const messagesTextInput = NewElement(
    'input',
    'container_messages_users-text_container_row_input'
  );
  const messagesTextInputSend = NewElement(
    'button',
    'container_messages_users-text_container_row_send',
    'Send'
  );
  messagesTextInputRow.appendChild(messagesTextInput);
  messagesTextInputRow.appendChild(messagesTextInputSend);
  messagesTextContainer.appendChild(messagesText);
  messagesTextContainer.appendChild(messagesTextInputRow);

  // Fetch and append all users
  GetUsers().then((users) => {
    // console.log(users);
    if (users != null) {
      users.forEach((eachUser) => {
        const user = NewElement(
          'span',
          'container_messages_users-text_users_user',
          eachUser.Username
        );
        user.addEventListener('click', (e) => {
          // fetch user message data
          messagesText.innerHTML = '';
          ['1', '2', '3', '4'].forEach((item) => {
            const text = NewElement(
              'span',
              'container_messages_users-text_users_text_content',
              item
            );
            messagesText.appendChild(text);
          });
        });
        messagesUsers.appendChild(user);
      });
    }
  });

  messagesUsersText.appendChild(messagesUsers);
  messagesUsersText.appendChild(messagesTextContainer);
  messagesContainer.appendChild(messagesUsersText);

  // const messagesInput = NewElement('input', 'container_messages_input');
  // const messageSend = NewElement('button', 'container_messages_send', 'Send');

  // socket start
  // let socket = new WebSocket('ws://localhost:8080/socket');
  // socket.onopen = () => {
  //   const greeting = NewElement(
  //     'span',
  //     'container_messages_message',
  //     'User connected!'
  //   );
  //   messagesContainer.appendChild(greeting);
  //   console.log('Successfully connected');
  // };

  // socket.onmessage = (e) => {
  //   const message = JSON.parse(e.data);
  //   console.log(message);
  //   if (message.username === 'Server') {
  //     const roomID = message.room;
  //     console.log(`Received room ID: ${roomID}`);
  //   } else {
  //     const messageDiv = document.createElement('div');
  //     messageDiv.textContent = `[${message.username}]: ${message.message}`;
  //     messagesContainer.appendChild(messageDiv);
  //   }
  // };

  // socket.onclose = (e) => {
  //   console.log('Closing connection', e);
  // };
  // socket.onerror = (err) => {
  //   console.log('Socket error: ', err);
  // };
  // messageSend.addEventListener('click', (e) => {
  //   socket.send(
  //     JSON.stringify({
  //       username: '1',
  //       message: messagesInput.value,
  //     })
  //   );
  //   messagesInput.value = '';
  // });
  // socket end
  // messagesContainer.appendChild(messagesInput);
  // messagesContainer.appendChild(messageSend);
  return messagesContainer;
};
