const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');
let roomName;
room.hidden = true;

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#message input');
  const value = input.value;
  socket.emit('new_message', value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = '';
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector('#name input');
  const value = input.value;
  socket.emit('nickname', value);
  input.value = '';
}

const showRoom = () => {
  room.hidden = false;
  welcome.hidden = true;
  const roomTitle = room.querySelector('h3');
  roomTitle.innerHTML = `Room ${roomName}`;

  const msgForm = room.querySelector('#message');
  const nameForm = room.querySelector('#name');
  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNicknameSubmit);
};

const done = message => {
  console.log(message);
};

function handleRoomNameSubmit(event) {
  event.preventDefault();
  input = form.querySelector('input');
  socket.emit('enter_room', input.value, showRoom);
  roomName = input.value;
  input.value = '';
}

form.addEventListener('submit', handleRoomNameSubmit);

socket.on('welcome', user => {
  addMessage(`${user} joined!`);
});
socket.on('bye', user => {
  addMessage(`${user} left!`);
});

socket.on('new_message', msg => {
  addMessage(msg);
});

socket.on('room_change', rooms => {
  const roomList = welcome.querySelector('ul');
  roomList.innerHTML = '';
  if (rooms.length === 0) {
    return;
  }
  rooms.forEach(room => {
    const li = document.createElement('li');
    li.innerText = room;
    roomList.append(li);
  });
});
