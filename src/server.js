//서버단 코드
import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

//pug 설정
app.set('view engine',"pug"); //확장자가 pug인 파일을 고르겠다.
app.set('views',__dirname+"/views");   //views폴더의 위치는 __dirname/views이다.
app.get("/",(req,res)=>res.render("home"))
//app.get("/*",(req,res)=>res.redirect("/")) // 홈말고 다른 링크로 접근하면 리다이렉트 시킨다.

app.use("/public",express.static(__dirname+"/public"));

const handleListen = () => console.log('server is running');

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on('connection',(socket)=>{
    console.log("Connected to Browser");
    sockets.push(socket);
    socket.on("close",()=>console.log("disconnected from browser")); //브라우저 창을 닫으면 실행됨. 이벤트리스너와 같음.
    socket.on("message",(message)=>{
        console.log(message.toString('utf-8'));
        //socket.send(message.toString('utf-8')) //나에게만 메시지를 다시 보내주는 코드
        sockets.forEach((asocket)=>{
            asocket.send(message.toString('utf-8')); //연결된 모든 connection에게 메시지를 보내줌
        })
    })
})
server.listen(3000,handleListen);
