export const SocketConnection = () => {
  let socket = new WebSocket('ws://localhost:8080/socket');

  socket.onopen = () => {
    console.log('Connection Established with the Server');
    socket.send('connection ID ABC');
  };

  socket.onclose = (e) => {
    console.log('Socket connection closed with the server: ', e);
  };

  socket.onerror = (err) => {
    console.log('Socket Error: ', err);
  };
  return socket;
};
