import Hellfire from './utils.js';
const canvas = document.getElementById('render');
const ctx = canvas.getContext('2d');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);

const ws = new Hellfire(ctx);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ws.castRays(canvas);
    try {
        requestAnimationFrame(gameLoop);
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener("sign", ()=> {
    $('#login').css('opacity','0');
    $("#logo").css("scale",'3');
    ws.swipeup();
    gameLoop();
})
//gameLoop();



window.addEventListener("resize", () => {
    canvas.setAttribute('width',window.innerWidth);
    canvas.setAttribute('height',window.innerHeight);});