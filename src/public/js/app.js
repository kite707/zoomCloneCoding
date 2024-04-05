const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;
const showRoom = () => {
  room.hidden = false;
  welcome.hidden = true;
  const roomTitle = room.querySelector('h3');
  roomTitle.innerHTML = `Room ${roomName}`;
};

function addMessage(message) {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
}

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

socket.on('welcome', () => {
  addMessage('someone joined!');
});
