

class Hellfire {
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
                    sessionStorage.setItem('uid',this.uid);
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
                    this.loading(100);
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
const canvas = document.getElementById("render");
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    // Add a camera to the scene
    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add a light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    light.intensity = 0.7;

    // Add a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

    return scene;
};

// Create the scene and run the render loop
const scene = createScene();
engine.runRenderLoop(() => scene.render());

// Resize the engine on window resize
window.addEventListener("resize", () => {
    engine.resize();
    canvas.setAttribute('width',window.innerWidth);
    canvas.setAttribute('height',window.innerHeight);});