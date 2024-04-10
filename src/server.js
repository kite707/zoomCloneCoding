//서버단 코드
import express from 'express';
import http from 'http';
import SocketIo from 'socket.io';

const app = express();

//pug 설정
app.set('view engine', 'pug'); //확장자가 pug인 파일을 고르겠다.
app.set('views', __dirname + '/views'); //views폴더의 위치는 __dirname/views이다.
app.get('/', (req, res) => res.render('home'));
//app.get("/*",(req,res)=>res.redirect("/")) // 홈말고 다른 링크로 접근하면 리다이렉트 시킨다.

app.use('/public', express.static(__dirname + '/public'));

const handleListen = () => console.log('server is running on port 3000');

const httpServer = http.createServer(app);
const wsServer = SocketIo(httpServer);

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  // const sids = wsServer.sockets.adapter.sids;
  // const rooms = wsServer.sockets.adapter.rooms;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

wsServer.on('connection', socket => {
  socket['nickname'] = 'Anonymous';
  socket.onAny(event => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, showRoom) => {
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit('welcome', socket.nickname);
    wsServer.sockets.emit('room_change', publicRooms());
  });
  socket.on('disconnecting', () => {
    socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname));
    socket.on('disconnect', () => {
      wsServer.sockets.emit('room_change', publicRooms());
    });
  });
  socket.on('new_message', (msg, roomName, done) => {
    socket.to(roomName).emit('new_message', `${socket.nickname} : ${msg}`);
    done();
  });
  socket.on('nickname', nickname => {
    socket['nickname'] = nickname;
  });
});

httpServer.listen(3000, handleListen);
