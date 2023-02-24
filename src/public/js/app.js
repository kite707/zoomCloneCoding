//프론트엔드 코드
alert("hi");
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