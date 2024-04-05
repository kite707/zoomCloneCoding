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

wsServer.on('connection', socket => {
  socket.onAny(event => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on('enter_room', (roomName, showRoom) => {
    socket.join(roomName);
    showRoom();
    socket.to(roomName).emit('welcome');
  });
});

httpServer.listen(3000, handleListen);
