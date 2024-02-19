import { NewElement } from '../helpers/createElement';
import { GetUsers } from '../backendConnection/getUsers';
import { GetMessages } from '../backendConnection/getMessages';
import { CheckUserState } from '../backendConnection/checkState';
import { LoadMoreMessages } from '../backendConnection/loadMoreMessages';
import {
  FormattedTimeDifference,
  GetTimeDifference,
} from '../helpers/timeDateManipulation';

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
  messagesTextInputSend.setAttribute('disabled', 'true');
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
    if (users != null && users.login != 'fail') {
      users.forEach((eachUser) => {
        if (!eachUser.CurrentUser) {
          const user = NewElement(
            'span',
            'container_messages_users-text_users_user',
            eachUser.Username
          );
          user.addEventListener('click', (e) => {
            // check if user is still logged in
            CheckUserState();
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
    let socket = new WebSocket('ws://localhost:8080/socket');

    // remove send button disabled state when socket is open to receive data
    socket.onopen = (e) => {
      messagesTextInputSend.removeAttribute('disabled');
      // socket.send(JSON.stringify({ user: currentUser.Id, status: 'online' }));
    };

    // disable send button on socket close and print
    socket.onclose = (e) => {
      console.log('Socket closed', err);
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

          // send text to server via socket

          socket.send(
            JSON.stringify({
              type: 'message',
              fromuser: currentUser.Id,
              message: messagesTextInput.value,
              touser: channelPartner.Id,
            })
          );
          messagesTextInput.value = '';
        }
      }
    });

    socket.onmessage = (e) => {
      let message = JSON.parse(e.data);
      if (channelPartner.Id == message.fromuser) {
        const text = NewElement(
          'div',
          'container_messages_users-text_container_content_text'
        );
        const textRowPoster = NewElement(
          'span',
          'container_messages_users-text_container_content_text_user',
          `${users.filter((x) => x.Id == message.fromuser)[0].Username}`
        );
        const textRowContent = NewElement(
          'span',
          'container_messages_users-text_container_content_text_text',
          `${message.message}`
        );

        const rootTextbox = document.querySelector(
          '.container_messages_users-text_container_content'
        );
        let lastPosterNode =
          rootTextbox.childNodes[rootTextbox.childNodes.length - 1];
        while (lastPosterNode.childNodes.length != 2) {
          lastPosterNode = lastPosterNode.previousSibling;
        }
        let lastposter = lastPosterNode.childNodes[0].textContent;
        // console.log(users.filter((x) => x.Id == message.fromuser)[0].Username);
        if (
          lastposter !=
          users.filter((x) => x.Id == message.fromuser)[0].Username
        ) {
          text.appendChild(textRowPoster);
        }

        text.appendChild(textRowContent);
        messagesText.appendChild(text);
        messagesText.scrollTo(0, messagesText.scrollHeight);
      }
    };

    loadMoreCounter = 20;
    messagesText.addEventListener('wheel', (e) => {
      if (messagesText.scrollTop == 0) {
        messagesText.scrollTop = 1;
        console.log('Loading');
        LoadMoreMessages(loadMoreCounter, channelPartner.Id).then(
          (moreMessages) => {
            addToExistingMessages(moreMessages, users, lastposter, currentUser);
          }
        );
        loadMoreCounter += 10;
      }
    });
  });

  messagesUsersText.appendChild(messagesUsers);
  messagesUsersText.appendChild(messagesTextContainer);
  messagesContainer.appendChild(messagesUsersText);

  return messagesContainer;
};
