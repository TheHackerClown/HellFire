(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();class d{constructor(s){this.uid=null,this.ws=new WebSocket("ws://localhost:8080"),this.queue=[],this.player=null,this.username="Player",this.sign=new CustomEvent("sign",{detail:"Emitted When User is Signed in"}),this.signout=new CustomEvent("signout",{detail:"Emitted When User is Signed Out"}),this.loadbanner=!0,this.ws.onopen=()=>{this.fire(1,"Connection Check"),$("#logo").css("scale",1),localStorage.getItem("uid")!=null?(this.uid=localStorage.getItem("uid"),this.signin(),this.showmenu()):this.showlogin()},this.ws.onmessage=e=>{const o=JSON.parse(e.data);switch(this.queue.push(o),o.code){case 1:console.log("Connection Successful");break;case 101:this.uid=o.data.uid,this.username=o.data.username,$("#intro_text").append(this.username),console.log("login successful",this.username),localStorage.setItem("uid",this.uid),this.showmenu();break;case 110:this.throwerr(110,o.data);break;case 111:console.log(this.username,o.data),this.uid=null,this.username="Player",localStorage.clear(),sessionStorage.clear(),this.showlogin();break;case 121:console.log("update environment in 3d");break;case 191:console.log("chats");break;case 201:console.log("leaderboard updates");break;case 222:console.log("match details");break;default:this.throwerr(999,"Please Contact Admin");break}},this.ws.onerror=()=>{this.throwerr(999,"Please Contact Admin")},this.ws.onclose=()=>{console.log("Thank you for Playing HellFire"),this.throwerr(999,"Server Shutdown")},this.tileSize=64,this.x=this.tileSize+this.tileSize/2,this.y=this.tileSize+this.tileSize/2,this.scale=2,this.fov=Math.PI/4,this.step=.1,this.speed=4,this.rotation=.1,this.angle=0,this.map=[[1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1],[1,1,1,0,1,1,0,1],[1,0,1,0,0,0,1,1],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,1]],this.mapWidth=this.map[0].length,this.mapHeight=this.map.length,this.ctx=s,this.pause=!0,window.addEventListener("keydown",e=>{e.key==="ArrowUp"?(this.x+=Math.cos(this.angle)*this.speed,this.y+=Math.sin(this.angle)*this.speed):e.key==="ArrowDown"?(this.x-=Math.cos(this.angle)*this.speed,this.y-=Math.sin(this.angle)*this.speed):e.key==="ArrowLeft"?this.angle-=.1:e.key==="ArrowRight"&&(this.angle+=.1)})}fire(s,e){this.ws.send(JSON.stringify({code:s,data:e,uid:this.uid}))}throwerr(s,e){$("#err-code").text(`Error ${s}`),$("#err-message").text(e),document.getElementById("alert-box").showModal()}loading(s){this.swipedown(),$("#logo").css("scale",3),$("#main_menu").css("display","none"),$("#login").css("display","none"),setTimeout(()=>{this.swipeup(),this.refresh()},s)}refresh(){localStorage.getItem("uid")!=null?this.showmenu():this.showlogin()}showlogin(){this.swipedown(),$("#logo").css("scale",1),$("#main_menu").css("display","none"),$("#login").css("display","flex"),$("#username").val(""),$("#passkey").val("")}showmenu(){this.swipedown(),$("#logo").css("scale",1),$("#login").css("display","none"),$("#main_menu").css("display","flex"),$("#username").val(""),$("#passkey").val("")}swipeup(){this.loadbanner&&($("#blackout").css("transform","translateY(-100%)"),setTimeout(()=>{$("#blackout").css("display","none"),this.pause=!1,this.loadbanner=!1},5001))}swipedown(){this.loadbanner||($("#blackout").css("display","flex"),$("#blackout").css("transform","translateY(0%)"),this.refresh(),this.pause=!0,this.loadbanner=!0)}signin(){const s=$("#username").val(),e=$("#passkey").val();this.fire(100,{token:s,tokpass:e}),$("#username").val(""),$("#passkey").val("")}castRays(s){const e=s.width,o=this.fov/e;for(let t=0;t<e;t++){const i=this.angle-this.fov/2+t*o,n=this.getdistance(i),a=this.tileSize/n*255;this.ctx.fillStyle=`rgb(${255-n/3}, 0, 0)`,this.ctx.fillRect(t,(s.height-a)/this.scale,1,a)}}getdistance(s){let e=0;const o=Math.sin(s),t=Math.cos(s);for(;;){const i=Math.floor(this.x+e*t),n=Math.floor(this.y+e*o),a=Math.floor(i/this.tileSize),l=Math.floor(n/this.tileSize);if(a<0||a>=this.mapWidth||l<0||l>=this.mapHeight)return 1/0;if(this.map[l][a]>0)return e;e+=this.step}}logout(){this.swipedown(),this.fire(111,this.uid),this.showlogin()}}const r=document.getElementById("render"),u=r.getContext("2d");r.setAttribute("width",window.innerWidth);r.setAttribute("height",window.innerHeight);const h=new d(u);window.addEventListener("DOMContentLoaded",()=>{$("#preptodie").on("click",()=>{h.signin()}),$("#logout").on("click",()=>{h.logout()})});window.addEventListener("resize",()=>{r.setAttribute("width",window.innerWidth),r.setAttribute("height",window.innerHeight)});