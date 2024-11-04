

export default class Hellfire {
    constructor() {
        this.uid = null;
        this.ws = new WebSocket("ws://localhost:8080");
        this.queue = new Array();
        this.load_inter = 0;
        this.sign = false;
        this.loadbanner = true;
        this.connection = false;
        this.ws.onopen = () => {
            this.fire(1,"Connection Check")
        }
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            this.queue.unshift(msg);
            switch (msg.code) {
                case 1:
                    this.connection = true;
                    console.log('Connection Successful')
                    break;
                case 101:
                    this.sign = true;
                    this.uid = msg.data;
                    localStorage.setItem('uid',this.uid);
                    break;
                case 110:
                    this.throwerr(110, msg.data);
                    break;
                case 121:
                    console.log("update environment in 3d");
                    break;
                case 191:
                    console.log("chats");
                    break;
                case 201:
                    console.log("leaderboard updates");
                    break;
                case 222:
                    console.log("match details");
                    break;
                default:
                    this.throwerr(999, "Please Contact Admin");
                    break;
            }
        }
        this.ws.onerror = () => {
            this.throwerr(999, "Please Contact Admin")
        }
        this.ws.onclose = () => {
            console.log("Thank you for Playing HellFire")
        }
    }
    fire(code, data) {
        this.ws.send(JSON.stringify({code:code,data:data,uid:this.uid}))
    }
    throwerr(code, message) {
        $('#err-code').text(`Error ${code}`);
        $('#err-message').text(message);
        document.getElementById("alert-box").showModal();
    }
    loading(time) {
        $("#loading-progress").val(this.load_inter);
        
        if (this.loadbanner == false) {
            this.swipedown()
            setTimeout(() => {
                
                let loading = setInterval(()=>{
                    if (this.load_inter>=100) {
                        clearInterval(loading)
                    }
                    $('#loading-progress').val(this.load_inter);
                    this.load_inter+=10;
                },time)
                setTimeout(() => {
                    this.swipeup();
                }, (time*10)+1000);
            
            }, 5001);
        } else {
            let loading = setInterval(()=>{
                if (this.load_inter>=100) {
                    clearInterval(loading)
                }
                $('#loading-progress').val(this.load_inter);
                this.load_inter+=10;
            },time)
            setTimeout(() => {
                this.swipeup();
            }, (time*10)+100);
        }
    }
    swipeup(){
        $('#blackout').css('transform',"translateY(-100%)")
        setTimeout(() => {
            $('#blackout').css('display','none');
            this.load_inter = 0;
        }, 5001);
        this.loadbanner = false;
    }
    swipedown(){
        $('#blackout').css('display','flex')
        $('#blackout').css('transform',"translateY(0%)")
        
    }
    signin() {
        const token = $('#username').val();
        const tokpass = $('#passkey').val();
        this.fire(100,{token:token,tokpass:tokpass});

        //Animation if login successfullll
        setTimeout(() => {
            if (this.sign == true) {
                $('#login').css('opacity','0');
                setTimeout(()=>{
                    $("#loading").css("opacity",'1');
                    $('#username').val("");
                    $('#passkey').val("");
                },500)}
        }, 200);
        
    }
}

class GameInput {
    constructor () {
        this.queue = new Object();
        window.addEventListener('keydown',(e)=>{
            this.queue[e.key.toLowerCase()] = true;
            console.log(this.queue)
        })
        window.addEventListener('keyup',(e)=>{
            this.queue[e.key.toLowerCase()] = false;
        })
    }
    check() {
        for (let e in this.queue) {
            if (this.queue[e] == true || this.queue[e] != undefined) {
                switch (e.toLowerCase()) {
                    case 'w':
                        camera.position.z -= 1;
                        break;
                    case 's':
                        camera.position.z += 1;
                        break;
                    case 'a':
                        camera.position.x -= 1;
                        break;
                    case 'd':
                        camera.position.x += 1;
                        break;
                    default:
                        console.log("Keybind not found")
                        break;
    
                    
                }
                delete this.queue[e];
            }
        }
        
    }
}

class Player {
    constructor() {
        this.me = 's';
        this.canvas = document.getElementById("render");
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new UniversalCamera("playerCamera", new BABYLON.Vector3(0, 1.6, -5), this.scene);
        this.camera.attachControl(canvas, false);
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        this.engine.runRenderLoop(() => {
            scene.render(); 
        });
    }
}

