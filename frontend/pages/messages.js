import { NewElement } from '../helpers/createElement';
import { GetUsers } from '../backendConnection/getUsers';
import { GetMessages } from '../backendConnection/getMessages';

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
  messagesTextInputSend.setAttribute("disabled", "true")
  messagesTextInputRow.appendChild(messagesTextInput);
  messagesTextInputRow.appendChild(messagesTextInputSend);
  messagesTextContainer.appendChild(messagesText);
  messagesTextContainer.appendChild(messagesTextInputRow);

  let currentUser;
  let channelPartner;
  // Fetch and append all users
  GetUsers().then((users) => {
    console.log(users);
    if (users != null && users.login != 'fail') {
      users.forEach((eachUser) => {
        if (!eachUser.CurrentUser) {
          const user = NewElement(
            'span',
            'container_messages_users-text_users_user',
            eachUser.Username
          );
          user.addEventListener('click', (e) => {
            // fetch user message data
            // last 10 items from db, set index to 10?
            messagesText.innerHTML = '';
            let count = 10;
            GetMessages(count, eachUser.Id).then((message) => {
              if (message != null) {
                for (let i = message.length-1; 0 <= i; i--) {
                  const text = NewElement(
                    'span',
                    'container_messages_users-text_users_text_content',
                    `${
                      users.filter((x) => x.Id == message[i].FromUser)[0]
                        .Username
                    }: ${message[i].Message}`
                  );
                  if (currentUser.Id == message[i].FromUser) {
                    text.style.color = 'gray';
                  }
                  messagesText.appendChild(text);
                }
              }
            });

            // set channel partner
            channelPartner = eachUser;
          });
          messagesUsers.appendChild(user);
        } else {
          currentUser = eachUser;
        }
      });
    }

    let socket = new WebSocket('ws://localhost:8080/socket');
    socket.onopen = (e) => {
      messagesTextInputSend.removeAttribute('disabled');
      // socket.send(JSON.stringify({ user: currentUser.Id, status: 'online' }));
    };

    socket.onclose = (e) => {
      messagesTextInputSend.setAttribute('disabled', 'true');

      // const notifySocket = {
      //   user: currentUser.Id,
      //   status: 'offline',
      // };
      // socket.send(JSON.stringify(notifySocket));
    };

    socket.onerror = (err) => {
      // messagesText.innerHTML = '';
      // const error = NewElement(
      //   'span',
      //   'container_messages_message',
      //   'Server closed the connection, socket error!'
      // );
      // messagesText.appendChild(error);

      // const errorMsg = NewElement('span', 'container_messages_message', err);
      // messagesText.appendChild(errorMsg);
      messagesTextInputSend.setAttribute('disabled', 'true');
    };

    messagesTextInputSend.addEventListener('click', (e) => {
      console.log(
        'Sending data:',
        currentUser.Username,
        '->',
        channelPartner.Username
      );
      socket.send(
        JSON.stringify({
          type: 'message',
          fromuser: currentUser.Id,
          message: messagesTextInput.value,
          touser: channelPartner.Id,
        })
      );
      messagesTextInput.value = '';
    });

    socket.onmessage = (e) => {
      console.log(JSON.parse(e.data));
    };
  });

  messagesUsersText.appendChild(messagesUsers);
  messagesUsersText.appendChild(messagesTextContainer);
  messagesContainer.appendChild(messagesUsersText);

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
