//프론트엔드 코드
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");


const websocket = new WebSocket(`ws://${window.location.host}`)
websocket.addEventListener("open",()=>{
    console.log("Connected to Server");
})
websocket.addEventListener("message",(message)=>{
    console.log("i got message, it says",message.data);
})
websocket.addEventListener("close",()=>{
    console.log("disconnected from server");
})

setTimeout(()=>{
    websocket.send("hello! i'm browser socket!!");
},10000)//10초뒤 위와 같은 메시지 보냄.

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value);
    websocket.send(input.value);
    input.value="";

}

messageForm.addEventListener("submit",handleSubmit)