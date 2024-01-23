export const SendLoginData = (username, password) => {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:8080/login';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var data = JSON.stringify({ username: username, password: password });
  xhr.send(data);
};
