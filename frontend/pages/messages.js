import { NewElement } from '../helpers/createElement';
import { GetUsers } from '../backendConnection/getUsers';
import { GetMessages } from '../backendConnection/getMessages';
import { CheckUserState } from '../backendConnection/checkState';
import { LoadMoreMessages } from '../backendConnection/loadMoreMessages';
import { throttle } from '../helpers/throttle';
import { socket } from '../backendConnection/checkState';

const addToExistingMessages = (message, users, lastposter, currentUser) => {
  const messagesText = document.querySelector(
    '.container_messages_users-text_container_content'
  );
  let oldheight = messagesText.scrollHeight;
  if (message != null) {
    for (let i = 0; i < message.length; i++) {
      const text = NewElement(
        'div',
        'container_messages_users-text_container_content_text'
      );
      const textRowPoster = NewElement(
        'span',
        'container_messages_users-text_container_content_text_user',
        `${users.filter((x) => x.Id == message[i].FromUser)[0].Username}`
      );
      const textRowContent = NewElement(
        'span',
        'container_messages_users-text_container_content_text_text',
        `${message[i].Message}`
      );
      const newDate = document.createElement('span');
      const messageDate = new Date(message[i].Date);
      newDate.textContent = `${messageDate.getDate()}-${
        messageDate.getMonth() + 1
      }-${messageDate.getFullYear()}`;
      newDate.classList.add('message-date');
      textRowContent.appendChild(newDate);
      text.appendChild(textRowPoster);
      text.appendChild(textRowContent);
      if (
        messagesText.firstChild.childNodes[0].textContent ==
        users.filter((x) => x.Id == message[i].FromUser)[0].Username
      ) {
        messagesText.firstChild.removeChild(
          messagesText.firstChild.childNodes[0]
        );
      }
      if (currentUser.Id == message[i].FromUser) {
        textRowPoster.classList.add('post-ownership');
        textRowContent.classList.add('text-ownership');
      }
      messagesText.insertBefore(text, messagesText.firstChild);
    }
    messagesText.scrollTo(0, messagesText.scrollHeight - oldheight);
  }
};

const buildMessages = (message, users, lastposter, currentUser) => {
  const messagesText = document.querySelector(
    '.container_messages_users-text_container_content'
  );
  if (messagesText != null) {
    messagesText.innerHTML = '';
    if (message != null) {
      for (let i = message.length - 1; 0 <= i; i--) {
        const text = NewElement(
          'div',
          'container_messages_users-text_container_content_text'
        );
        const textRowPoster = NewElement(
          'span',
          'container_messages_users-text_container_content_text_user',
          `${users.filter((x) => x.Id == message[i].FromUser)[0].Username}`
        );
        const textRowContent = NewElement(
          'span',
          'container_messages_users-text_container_content_text_text',
          `${message[i].Message}`
        );
        const newDate = document.createElement('span');
        const messageDate = new Date(message[i].Date);
        newDate.textContent = `${messageDate.getDate()}-${
          messageDate.getMonth() + 1
        }-${messageDate.getFullYear()}`;
        newDate.classList.add('message-date');
        textRowContent.appendChild(newDate);
        // {FormattedTimeDifference(GetTimeDifference(message[i].Date))
        if (
          lastposter !=
          users.filter((x) => x.Id == message[i].FromUser)[0].Username
        ) {
          text.appendChild(textRowPoster);
        }
        lastposter = users.filter((x) => x.Id == message[i].FromUser)[0]
          .Username;
        text.appendChild(textRowContent);
        if (currentUser.Id == message[i].FromUser) {
          textRowPoster.classList.add('post-ownership');
          textRowContent.classList.add('text-ownership');
        }
        messagesText.appendChild(text);
      }
      messagesText.scrollTo(0, messagesText.scrollHeight);
    }
  }
  return lastposter;
};

export const Messages = () => {
  let count = 10;
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
  const messagesText = NewElement(
    'div',
    'container_messages_users-text_container_content'
  );
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
  const messagesTextWelcome = NewElement(
    'span',
    'container_messages_users-text_container_welcome',
    'Select a user from left to start communicating!'
  );
  messagesTextContainer.appendChild(messagesTextWelcome);
  messagesTextInputRow.appendChild(messagesTextInput);
  messagesTextInputRow.appendChild(messagesTextInputSend);
  messagesTextContainer.appendChild(messagesText);
  messagesTextContainer.appendChild(messagesTextInputRow);

  messagesTextInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      messagesTextInputSend.click();
    }
  });

  let currentUser;
  let channelPartner;
  let loadMoreCounter;

  // Fetch and append all user in database
  let lastposter;
  GetUsers().then((users) => {
    // console.log(users);
    if (users != null && users.login != 'fail') {
      users.forEach((eachUser) => {
        if (!eachUser.CurrentUser) {
          const user = NewElement(
            'span',
            'container_messages_users-text_users_user',
            eachUser.Username
          );
          user.setAttribute('id', eachUser.Id);
          user.addEventListener('click', (e) => {
            // check if user is still logged in
            CheckUserState();
            if (user.classList.contains('new-message')) {
              user.classList.remove('new-message');
            }
            if (messagesTextContainer.contains(messagesTextWelcome)) {
              messagesTextContainer.removeChild(messagesTextWelcome);
            }
            loadMoreCounter = 20;
            GetMessages(count, eachUser.Id).then((message) => {
              buildMessages(message, users, lastposter, currentUser);
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

    // open websocket

    // remove send button disabled state when socket is open to receive data

    // disable send button on socket close and print
    socket.onclose = (e) => {
      console.log('Socket closed from messages', e);
      messagesTextInputSend.setAttribute('disabled', 'true');
    };

    // disable send button on error and print
    socket.onerror = (err) => {
      console.log('Socket error', err);
      messagesTextInputSend.setAttribute('disabled', 'true');
    };

    // check send button logic
    messagesTextInputSend.addEventListener('click', (e) => {
      if (messagesTextInput.value.length != 0) {
        if (channelPartner != null) {
          // text row container
          const text = NewElement(
            'div',
            'container_messages_users-text_container_content_text'
          );
          // text author
          const textRowPoster = NewElement(
            'span',
            'container_messages_users-text_container_content_text_user',
            `${users.filter((x) => x.Id == currentUser.Id)[0].Username}`
          );
          // text content
          const textRowContent = NewElement(
            'span',
            'container_messages_users-text_container_content_text_text',
            `${messagesTextInput.value}`
          );
          textRowPoster.classList.add('post-ownership');
          textRowContent.classList.add('text-ownership');

          // check whos the last poster and logic if to add username or not
          const rootTextbox = document.querySelector(
            '.container_messages_users-text_container_content'
          );
          let lastposter;
          if (rootTextbox.childNodes.length != 0) {
            let lastPosterNode =
              rootTextbox.childNodes[rootTextbox.childNodes.length - 1];
            if (lastPosterNode != null) {
              while (lastPosterNode.childNodes.length != 2) {
                lastPosterNode = lastPosterNode.previousSibling;
              }
            }
            lastposter = lastPosterNode.childNodes[0].textContent;
          }
          if (
            lastposter !=
            users.filter((x) => x.Id == currentUser.Id)[0].Username
          ) {
            text.appendChild(textRowPoster);
          }
          // end
          const newDate = document.createElement('span');
          const messageDate = new Date();
          newDate.textContent = `${messageDate.getDate()}-${
            messageDate.getMonth() + 1
          }-${messageDate.getFullYear()}`;
          newDate.classList.add('message-date');
          textRowContent.appendChild(newDate);

          text.appendChild(textRowContent);
          messagesText.appendChild(text);
          messagesText.scrollTo(0, messagesText.scrollHeight);

          // raise child to parent first
          console.log(currentUser);
          const allUsers = document.querySelectorAll(
            '.container_messages_users-text_users_user'
          );
          allUsers.forEach((user) => {
            console.log(user.childNodes[0].data);
            if (user.childNodes[0].data == channelPartner.Username) {
              messagesUsers.insertBefore(user, messagesUsers.firstChild);
            }
          });
          // messagesUsers.insertBefore( ,messagesUsers.firstChild)
          // usersParent[0].insertBefore(user, usersParent[0].firstChild);
          // send text to server via socket
          socket.send(
            JSON.stringify({
              type: 'message',
              fromuser: currentUser.Username,
              fromuserid: currentUser.Id,
              message: messagesTextInput.value,
              touser: channelPartner.Id,
            })
          );
          messagesTextInput.value = '';
        }
      }
    });

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'onlineStatus',
          status: 'online',
        })
      );
    } else {
      socket.onopen = (e) => {
        socket.send(
          JSON.stringify({
            type: 'onlineStatus',
            status: 'online',
          })
        );
      };
    }

    socket.onmessage = (e) => {
      let message = JSON.parse(e.data);
      if (message.type == 'onlineStatus') {
        console.log('Got online user list! ');
        const allUsers = document.querySelectorAll(
          '.container_messages_users-text_users_user'
        );
        allUsers.forEach((user) => {
          if (user.classList.contains('user-logged-in')) {
            user.classList.remove('user-logged-in');
          }
        });
        allUsers.forEach((user) => {
          for (let i = 0; i < message.connectedclients.length; i++) {
            if (user.id == message.connectedclients[i]) {
              console.log('Applying online status to user: ', user.id);
              user.classList.add('user-logged-in');
            }
          }
        });
      }
      if (channelPartner != null) {
        if (channelPartner.Id == message.fromuserid) {
          const text = NewElement(
            'div',
            'container_messages_users-text_container_content_text'
          );
          const textRowPoster = NewElement(
            'span',
            'container_messages_users-text_container_content_text_user',
            `${users.filter((x) => x.Id == message.fromuserid)[0].Username}`
          );
          const textRowContent = NewElement(
            'span',
            'container_messages_users-text_container_content_text_text',
            `${message.message}`
          );

          const rootTextbox = document.querySelector(
            '.container_messages_users-text_container_content'
          );
          if (rootTextbox != null) {
            let lastPosterNode =
              rootTextbox.childNodes[rootTextbox.childNodes.length - 1];
            while (lastPosterNode.childNodes.length != 2) {
              lastPosterNode = lastPosterNode.previousSibling;
            }
            let lastposter = lastPosterNode.childNodes[0].textContent;
            // console.log(users.filter((x) => x.Id == message.fromuser)[0].Username);
            if (
              lastposter !=
              users.filter((x) => x.Id == message.fromuserid)[0].Username
            ) {
              text.appendChild(textRowPoster);
            }

            const newDate = document.createElement('span');
            const messageDate = new Date();
            newDate.textContent = `${messageDate.getDate()}-${
              messageDate.getMonth() + 1
            }-${messageDate.getFullYear()}`;
            newDate.classList.add('message-date');
            textRowContent.appendChild(newDate);

            text.appendChild(textRowContent);
            messagesText.appendChild(text);
            messagesText.scrollTo(0, messagesText.scrollHeight);
          }
          const usersParent = document.querySelectorAll(
            '.container_messages_users-text_users'
          );
          const allUsers = document.querySelectorAll(
            '.container_messages_users-text_users_user'
          );
          allUsers.forEach((user) => {
            if (user.childNodes[0].data == message.fromuser) {
              usersParent[0].insertBefore(user, usersParent[0].firstChild);
            }
          });
        } else {
          const allUsers = document.querySelectorAll(
            '.container_messages_users-text_users_user'
          );
          allUsers.forEach((user) => {
            if (user.childNodes[0].data == message.fromuser) {
              user.classList.add('new-message');
            }
          });
        }
      } else {
        const usersParent = document.querySelectorAll(
          '.container_messages_users-text_users'
        );
        const allUsers = document.querySelectorAll(
          '.container_messages_users-text_users_user'
        );
        allUsers.forEach((user) => {
          if (user.childNodes[0].data == message.fromuser) {
            user.classList.add('new-message');
            usersParent[0].insertBefore(user, usersParent[0].firstChild);
          }
        });
      }
    };
    const throttledWheelHandler = throttle((e) => {
      if (messagesText.scrollTop < 10) {
        // console.log('Loading more messages!');
        LoadMoreMessages(loadMoreCounter, channelPartner.Id).then(
          (moreMessages) => {
            addToExistingMessages(moreMessages, users, lastposter, currentUser);
          }
        );
        loadMoreCounter += 10;
      }
    }, 500);

    loadMoreCounter = 20;
    messagesText.addEventListener('wheel', throttledWheelHandler);
  });

  messagesUsersText.appendChild(messagesUsers);
  messagesUsersText.appendChild(messagesTextContainer);
  messagesContainer.appendChild(messagesUsersText);

  return messagesContainer;
};
