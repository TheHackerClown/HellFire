import Hellfire from './utils.js';

const ws = new Hellfire();

const button = document.getElementById('preptodie');
button.onclick = () => {ws.signin()};


if (localStorage.getItem("uid") != null ) {
    ws.uid = localStorage.getItem("uid");
    $('#username').prop('disabled',true);
    $('#passkey').prop('disabled',true);
    $('#preptodie').prop('disabled',true);
    $('#login').css('opacity','0');
    setTimeout(()=>{
        $("#loading").css("opacity",'1');
        ws.loading(100)
    },1000)
}

let wait = setInterval(() => {
    if (ws.sign) {
        clearInterval(wait)
    }
}, 500);

// WebSocket setup


window.addEventListener("resize", () => {
    //engine.resize();
    canvas.setAttribute('width',window.innerWidth);
    canvas.setAttribute('height',window.innerHeight);});