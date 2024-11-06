export default class Hellfire {
    constructor(ctx) {
        this.uid = null;
        this.ws = new WebSocket("ws://localhost:8080");
        this.queue = [];
        this.player = null;
        this.username= 'Player';
        this.sign = new CustomEvent("sign", { detail: 'Emitted When User is Signed in' });
        this.loadbanner = true;
        this.ws.onopen = () => {
            this.fire(1,"Connection Check")
            $('#logo').css('scale', 1);
            if (localStorage.getItem("uid") != null ) {
                this.uid = localStorage.getItem("uid");
                $('#username').prop('disabled',true);
                $('#passkey').prop('disabled',true);
                $('#preptodie').prop('disabled',true);
                $('#login').css('opacity','0');
                this.signin();
                $("#logo").css("scale",'3');
                setTimeout(()=>{
                    this.swipeup()
                },1000)
            } else {
                $('#login').css('opacity','1');
                $('#username').prop('disabled',false);
                $('#passkey').prop('disabled',false);
                $('#preptodie').prop('disabled',false);
                const button = document.getElementById('preptodie');
                button.onclick = () => {this.signin()};
            }
            
        }
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            this.queue.push(msg);
            switch (msg.code) {
                case 1:
                    console.log('Connection Successful')
                    break;
                case 101:
                    this.uid = msg.data.uid;
                    this.username = msg.data.username;
                    console.log('login successful',this.username)
                    localStorage.setItem('uid',this.uid);
                    window.dispatchEvent(this.sign);
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
            this.throwerr(999, "Server Shutdown")
        }

        //Player Data
        this.tileSize = 64;
        this.x = this.tileSize + this.tileSize / 2;
        this.y = this.tileSize + this.tileSize / 2;
        this.scale = 2;
        this.fov = Math.PI / 4;
        this.step = 0.1;
        this.speed = 4;
        this.rotation = 0.1;
        this.angle = 0;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];// || sentmap;
        this.mapWidth = this.map[0].length;
        this.mapHeight = this.map.length;
        this.ctx = ctx;
        this.pause = true;
        window.addEventListener('keydown',(e)=>{
            const speed = 4;
            if (e.key === "ArrowUp") {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            } else if (e.key === "ArrowDown") {
                this.x -= Math.cos(this.angle) * this.speed;
                this.y -= Math.sin(this.angle) * this.speed;
            } else if (e.key === "ArrowLeft") {
                this.angle -= 0.1;
            } else if (e.key === "ArrowRight") {
                this.angle += 0.1;
            }
        });
    }
    fire(code, data) {
        this.ws.send(JSON.stringify({code:code,data:data,uid:this.uid}))
    }
    throwerr(code, message) {
        $('#err-code').text(`Error ${code}`);
        $('#err-message').text(message);
        document.getElementById("alert-box").showModal();
    }
    swipeup(){
        if (this.loadbanner) {
            $('#blackout').css('transform',"translateY(-100%)")
            setTimeout(() => {
                $('#blackout').css('display','none');
                this.pause = false;
                this.loadbanner = false;
            }, 5001);
        }
    }
    swipedown(){
        if (!this.loadbanner) {
            $('#blackout').css('display','flex');
            $('#blackout').css('transform',"translateY(0%)");
            this.pause = true;
            this.loadbanner = true;
        }
        
    }
    signin() {
        const token = $('#username').val();
        const tokpass = $('#passkey').val();
        this.fire(100,{token:token,tokpass:tokpass});
        $('#username').val("");
        $('#passkey').val("");
        
    }
    castRays(canvas) {
        const numRays = canvas.width;  
        const rayAngleStep = this.fov / numRays;
    
        for (let i = 0; i < numRays; i++) {
            const rayAngle = this.angle - this.fov / 2 + i * rayAngleStep;
            const distance = this.getdistance(rayAngle);
            const wallHeight = (this.tileSize / distance) * 255;
            this.ctx.fillStyle = `rgb(${255 - distance / 3}, 0, 0)`;
            this.ctx.fillRect(i, (canvas.height - wallHeight) / this.scale, 1, wallHeight);
        }
    }
    getdistance(angle) {
        let distance = 0;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
    
        while (true) {
            const rayX = Math.floor(this.x + distance * cos);
            const rayY = Math.floor(this.y + distance * sin);
            const mapX = Math.floor(rayX / this.tileSize);
            const mapY = Math.floor(rayY / this.tileSize);
    
            if (mapX < 0 || mapX >= this.mapWidth || mapY < 0 || mapY >= this.mapHeight) return Infinity;
            if (this.map[mapY][mapX] > 0) return distance;
    
            distance += this.step;
        }
    }
}

