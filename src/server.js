//서버단 코드
import express from "express";

const app = express();

//pug 설정
app.set('view engine',"pug"); //확장자가 pug인 파일을 고르겠다.
app.set('views',__dirname+"/views");   //views폴더의 위치는 __dirname/views이다.
app.get("/",(req,res)=>res.render("home"))
app.get("/*",(req,res)=>res.redirect("/")) // 홈말고 다른 링크로 접근하면 리다이렉트 시킨다.

app.use("/public",express.static(__dirname+"/public"));

const handleListen = () => console.log('server is running');
app.listen(3000);
