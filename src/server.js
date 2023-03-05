//서버단 코드
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

//pug 설정
app.set('view engine', 'pug'); //확장자가 pug인 파일을 고르겠다.
app.set('views', __dirname + '/views'); //views폴더의 위치는 __dirname/views이다.
app.get('/', (req, res) => res.render('home'));
//app.get("/*",(req,res)=>res.redirect("/")) // 홈말고 다른 링크로 접근하면 리다이렉트 시킨다.

app.use('/public', express.static(__dirname + '/public'));

const handleListen = () => console.log('server is running on port 3000');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on('connection', socket => {
  console.log('Connected to Browser');
  sockets.push(socket);
  socket['nickName'] = 'Anon';
  socket.on('close', () => console.log('disconnected from browser')); //브라우저 창을 닫으면 실행됨. 이벤트리스너와 같음.
  socket.on('message', msg => {
    const message = JSON.parse(msg.toString('utf-8'));
    //socket.send(message.toString('utf-8')) //나에게만 메시지를 다시 보내주는 코드
    switch (message.type) {
      case 'new_message':
        sockets.forEach(asocket => {
          asocket.send(`${socket.nickName}: ${message.payload}`); //연결된 모든 connection에게 메시지를 보내줌
        });
        break;
      case 'nickName':
        console.log('this is nickname :', message.type, message.payload);
        socket['nickName'] = message.payload;
        break;
    }
  });
});
server.listen(3000, handleListen);
