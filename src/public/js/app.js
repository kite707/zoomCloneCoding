const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

form.addEventListener('submit', handleRoomNameSubmit);
function handleRoomNameSubmit(event) {
  event.preventDefault();
  const roomName = form.querySelector('input');
  socket.emit('room', { payload: roomName.value }, () => {
    console.log('server is done, function name is end');
  });
  roomName.value = '';
}
