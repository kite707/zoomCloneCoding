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
  roomTitle.innerHTML = roomName;
};

form.addEventListener('submit', handleRoomNameSubmit);
function handleRoomNameSubmit(event) {
  event.preventDefault();
  roomName = form.querySelector('input').value;
  socket.emit('enter_room', roomName, showRoom);
  roomName.value = '';
}
