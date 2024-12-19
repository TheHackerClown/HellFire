//import * as Matter from "matter-js";
import React, { createContext, useEffect, useRef } from "react";
// export class Hellfire {
//   constructor(canvas: HTMLCanvasElement) {
//     this.uid = null;
//     this.ws = new WebSocket("ws://localhost:8080");
//     this.queue = [];
//     this.player = null;
//     this.username = "Player";
//     this.sign = new CustomEvent("sign", {
//       detail: "Emitted When User is Signed in",
//     });
//     this.signout = new CustomEvent("signout", {
//       detail: "Emitted When User is Signed Out",
//     });
//     this.loadbanner = true;
//     this.ws.onopen = () => {
//       this.fire(1, "Connection Check");
//       $("#logo").css("scale", 1);
//       if (localStorage.getItem("uid") != null) {
//         this.uid = localStorage.getItem("uid");
//         this.signin();
//         this.showmenu();
//       } else {
//         this.showlogin();
//       }
//     };
//     this.ws.onmessage = (event) => {
//       const msg = JSON.parse(event.data);
//       this.queue.push(msg);
//       switch (msg.code) {
//         case 1:
//           console.log("Connection Successful");
//           break;
//         case 101:
//           this.uid = msg.data.uid;
//           this.username = msg.data.username;
//           $("#intro_text").text(this.username);
//           console.log("login successful", this.username);
//           localStorage.setItem("uid", this.uid);
//           window.dispatchEvent(this.sign);
//           this.showmenu();
//           break;
//         case 110:
//           this.throwerr(110, msg.data);
//           break;
//         case 111:
//           console.log(this.username, msg.data);
//           this.uid = null;
//           this.username = "Player";
//           localStorage.clear();
//           sessionStorage.clear();
//           this.showlogin();
//           break;
//         case 120:
//           console.log("update environment in 3d");
//           break;
//         case 190:
//           console.log("chats");
//           break;
//         case 200:
//           console.log("leaderboard updates");
//           break;
//         case 210:
//           console.log("new rooms");
//           break;
//         case 220:
//           console.log("add myself to another room,");
//           break;
//         case 221:
//           console.log("exit match and room.");
//           break;
//         default:
//           this.throwerr(500, "Please Contact Admin");
//           break;
//       }
//     };
//     this.ws.onerror = () => {
//       this.throwerr(999, "Please Contact Admin");
//     };
//     this.ws.onclose = () => {
//       console.log("Connection Closed");
//       this.throwerr(999, "Server Shutdown");
//     };

//     //Game INIT
//     this.Engine = Matter.Engine;
//     this.Match = Matter.World;
//     this.Render = Matter.Render;
//     this.Runner = Matter.Runner;
//     this.Bodies = Matter.Bodies;
//     this.Composite = Matter.Composite;
//     this.Body = Matter.Body;
//     this.Collision = Matter.Collision;
//     this.engineloader = this.Engine.create();
//     this.lobby = this.engineloader.world;

//     this.render = this.Render.create({
//       engine: this.engine,
//       canvas: canvas,
//       options: {
//         width: window.innerWidth,
//         height: window.innerHeight,
//         wireframes: false, // Render with solid shapes
//         background: "black",
//         showAxes: true,
//       },
//     });
//   }

//   throwerr(code, message) {
//     $("#err-code").text(`Error ${code}`);
//     $("#err-message").text(message);
//     document.getElementById("alert-box").showModal();
//   }

//   loading(time) {
//     this.swipedown();
//     $("#logo").css("scale", 3);
//     $("#main_menu").css("display", "none");
//     $("#login").css("display", "none");
//     setTimeout(() => {
//       this.swipeup();
//       this.refresh();
//     }, time);
//   }

//   refresh() {
//     if (localStorage.getItem("uid") != null) {
//       this.showmenu();
//     } else {
//       this.showlogin();
//     }
//   }

//   showlogin() {
//     this.swipedown();
//     $("#logo").css("scale", 1);
//     $("#main_menu").css("display", "none");
//     $("#login").css("display", "flex");
//     $("#username").val("");
//     $("#passkey").val("");
//   }

//   showmenu() {
//     this.swipedown();
//     $("#logo").css("scale", 1);
//     $("#login").css("display", "none");
//     $("#main_menu").css("display", "flex");
//     $("#username").val("");
//     $("#passkey").val("");
//   }

//   swipeup() {
//     if (this.loadbanner) {
//       $("#blackout").css("transform", "translateY(-100%)");
//       setTimeout(() => {
//         $("#blackout").css("display", "none");
//         this.pause = false;
//         this.loadbanner = false;
//       }, 5001);
//     }
//   }
//   swipedown() {
//     if (!this.loadbanner) {
//       $("#blackout").css("display", "flex");
//       $("#blackout").css("transform", "translateY(0%)");
//       this.refresh();
//       this.pause = true;
//       this.loadbanner = true;
//     }
//   }
//   signin() {
//     const token = $("#username").val();
//     const tokpass = $("#passkey").val();
//     this.fire(100, { token: token, tokpass: tokpass });
//     $("#username").val("");
//     $("#passkey").val("");
//   }
//   drawMap(map, blocksize, columns, rows) {
//     for (let col = 0; col < columns; col++) {
//       for (let row = 0; row < rows; row++) {
//         ctx.fillStyle = map[row][col] === 0 ? "white" : "black";
//         ctx.fillRect(col * blocksize, row * blocksize, blocksize, blocksize);
//       }
//     }
//   }
//   logout() {
//     this.swipedown();
//     this.fire(111, this.uid);
//     this.showlogin();
//   }
// }

interface WebSocketContextType {
  ws: WebSocket | null | undefined;
  fire: (code: number, data: object | string | null) => void;
}

const defaultContext: WebSocketContextType = {
  ws: null,
  fire: () => {},
};

export const GlobalData = createContext<WebSocketContextType>(defaultContext);
export const MyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wsref = useRef<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    wsref.current = socket;
    socket.onopen = () => console.log("WebSocket connected");
    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onmessage = (e) => console.log(e);
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const fire = (code: number, data: object | string | null) => {
    try {
      if (wsref.current && wsref.current.readyState === WebSocket.OPEN) {
        wsref.current.send(
          JSON.stringify({
            code: code,
            data: data,
            uid: localStorage.getItem("uid"),
          })
        );
      } else {
        console.log("Testing");
      }
    } catch (e) {
      console.log("Error found : ", e);
    }
  };

  return (
    <GlobalData.Provider value={{ ws: wsref.current, fire }}>
      {children}
    </GlobalData.Provider>
  );
};

// const fire = (code : number, data : string) => void {
//     ws.send(JSON.stringify({ code: code, data: data, uid: localStorage.getItem('uid') }));
//   }
