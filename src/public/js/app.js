//프론트엔드 코드
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");


const websocket = new WebSocket(`ws://${window.location.host}`)
websocket.addEventListener("open",()=>{
    console.log("Connected to Server");
})
websocket.addEventListener("message",(message)=>{
    //console.log("i got message, it says",message.data);
    const li = document.createElement("li");
    li.innerHTML=message.data;
    messageList.append(li);
})
websocket.addEventListener("close",()=>{
    console.log("disconnected from server");
})

setTimeout(()=>{
    websocket.send("hello! i'm browser socket!!");
},10000)//10초뒤 위와 같은 메시지 보냄.

function handleMessageSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    console.log(input.value);
    websocket.send(input.value);
    input.value="";

}

messageForm.addEventListener("submit",handleMessageSubmit)
nickForm.addEventListener("submit",handleNickSubmit)