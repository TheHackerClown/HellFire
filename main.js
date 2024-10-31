//document.getElementById('dialog-dark-rounded').showModal()
function throwerr(code, message) {
    document.getElementById('err-code').textContent = `Error ${code}`;
    document.getElementById('err-message').textContent = message;
    document.getElementById("alert-box").showModal()
}
function sendusername() {
    ws.send(JSON.stringify({type:"NEW_PLAYER"}))
}


const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {

    ws.send(JSON.stringify({type:"NAME",data:"dsds"}))
}

ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.code > 400) {
        throwerr(msg.code, msg.data);
    }
}