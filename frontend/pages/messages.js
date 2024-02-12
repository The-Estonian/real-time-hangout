import { NewElement } from '../helpers/createElement';

export const Messages = () => {
  const messagesContainer = NewElement('div', 'container_messages');
  const messagesInput = NewElement('input', 'container_messages_input');
  const messageSend = NewElement('button', 'container_messages_send', 'Send');

  // socket start
  console.log('Socket connection!');
  let socket = new WebSocket('ws://localhost:8080/socket');
  socket.onopen = () => {
    const greeting = NewElement(
      'span',
      'container_messages_message',
      'User connected!'
    );
    messagesContainer.appendChild(greeting);
    console.log('Successfully connected');
    socket.send('Hello');
  };

  socket.onmessage = (msg) => {
    console.log(msg.data);
  };

  socket.onclose = (e) => {
    console.log('Closing connection', e);
  };
  socket.onerror = (err) => {
    console.log('Socket error: ', err);
  };

  // socket end
  messagesContainer.appendChild(messagesInput);
  messagesContainer.appendChild(messageSend);
  return messagesContainer;
};
