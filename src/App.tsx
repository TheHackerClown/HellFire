import "nes.css/css/nes.min.css";
import Login from "./components/Login";
import "./App.css";
//import Dialog from "./components/Dialog";
// import Room from "./components/Room";
//import { createPortal } from "react-dom";
import Menu from "./components/Menu";

function App() {
  let uid = localStorage.getItem("uid");
  let username = localStorage.getItem("username");
  if (uid && username) {
    return (
      <>
        <Menu name={username}></Menu>
      </>
    );
  } else {
    return (
      <>
        <Login></Login>
      </>
    );
  }
}

export default App;
