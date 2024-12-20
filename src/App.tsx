import "nes.css/css/nes.min.css";
import "./App.css";
import LeaderBoard from "./components/Leaderboard";
import HellButton from "./components/Button";
import { FormEvent, useState } from "react";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Login from "./components/Login";
import { createPortal } from "react-dom";
import Room from "./components/Room";
import Settings from "./components/Settings";
import GamePlayer from "./components/Canvas";
import AfterMatch from "./components/AfterMatch";

export default function App() {
  const [tab, setTab] = useState("none");
  const [username, setUsername] = useState<string | null>("dhruv");
  const [showModal, setModal] = useState(false);
  const [code, setCode] = useState(0);
  const [message, setMessage] = useState("");
  const [fromGame, setfromGame] = useState<"create" | "join" | null>(null);
  const [roomid, setRoomId] = useState<string | null>("");
  //   const { ws, fire } = useContext(GlobalData);
  //   // Handle tab changes
  const handleTabChange = (e: FormEvent | MouseEvent, tab?: string) => {
    if (tab && e) {
      setTab(tab);
    }
  };

  // Show dialog
  const showDialog = (code: number, message: string) => {
    setCode(code);
    setMessage(message);
    setModal(true);
  };
  // Hide dialog
  const hideDialog = (e: FormEvent | MouseEvent) => {
    if (e) {
      setModal(false);
      setCode(0);
      setMessage("");
    }
  };

  const currentTab = () => {
    switch (tab) {
      case "none":
        return (
          <>
            <Menu
              showModal={showModal}
              name={username}
              usernamefunc={setUsername}
              dialogfunc={showDialog}
              tabfunc={handleTabChange}
            />
          </>
        );
        break;
      case "leaderboard":
        return (
          <>
            <LeaderBoard></LeaderBoard>
            <HellButton
              extraClass="backtomenu is-error is-dark"
              clickfunc={(e) => handleTabChange(e, "none")}
            >
              Back to Menu
            </HellButton>
          </>
        );
        break;
      case "create":
        return (
          <>
            <Room
              fromGame={setfromGame}
              type="create"
              setRoomId={setRoomId}
              tabfunc={handleTabChange}
            ></Room>
          </>
        );
        break;
      case "join":
        return (
          <>
            <Room
              fromGame={setfromGame}
              type="join"
              roomid={roomid}
              setRoomId={setRoomId}
              tabfunc={handleTabChange}
            ></Room>
          </>
        );
        break;
      case "beforejoin":
        return (
          <>
            <Room
              fromGame={setfromGame}
              type="beforejoin"
              roomid={roomid}
              setRoomId={setRoomId}
              tabfunc={handleTabChange}
            ></Room>
          </>
        );
        break;
      case "game":
        return (
          <>
            <GamePlayer tabfunc={handleTabChange}></GamePlayer>
            <HellButton
              extraClass="backtomenu is-error is-dark"
              clickfunc={(e) => handleTabChange(e, "none")}
            >
              Back to Menu
            </HellButton>
          </>
        );
        break;
      case "aftergame":
        return (
          <>
            <AfterMatch></AfterMatch>
            <HellButton
              extraClass="backtomenu is-error is-dark"
              clickfunc={(e) => handleTabChange(e, "none")}
            >
              Back to Menu
            </HellButton>
          </>
        );
        break;

      case "settings":
        return (
          <>
            <Settings></Settings>
            <HellButton
              extraClass="backtomenu is-error is-dark"
              clickfunc={
                fromGame === "create" || fromGame === "join"
                  ? (e) => {
                      setfromGame(null);
                      handleTabChange(e, fromGame);
                    }
                  : (e) => {
                      setfromGame(null);
                      handleTabChange(e, "none");
                    }
              }
            >
              {fromGame !== "create" && fromGame !== "join"
                ? " Back to Menu "
                : " Back to Previous Screen "}
            </HellButton>
          </>
        );
        break;
      default:
        return (
          <>
            <div className="center">
              <h1>Error Occured</h1>
            </div>
          </>
        );
        break;
    }
  };
  //   useEffect(() => {
  //     if (localStorage.getItem("uid") && localStorage.getItem("username")) {
  //       fire(100, null);
  //       if (ws) {
  //         // WebSocket message handler
  //         ws.onmessage = (e: MessageEvent) => {
  //           let data = JSON.parse(e.data);
  //           switch (data.code) {
  //             case 101:
  //               localStorage.clear();
  //               sessionStorage.clear();
  //               localStorage.setItem("uid", data.data.uid);
  //               localStorage.setItem("username", data.data.username);
  //               setUsername(data.data.username);
  //               break;
  //             default:
  //               break;
  //           }
  //         };
  //       }
  //     }
  //   }, [ws, fire]);
  return (
    <>
      {tab !== "create" && tab !== "join" && tab !== "game" ? <Header /> : null}
      {username !== null ? (
        currentTab()
      ) : (
        <Login usernamefunc={setUsername} dialogfunc={showDialog} />
      )}

      {showModal
        ? createPortal(
            <Dialog
              showModal={showModal}
              code={code}
              data={message}
              hideModal={hideDialog}
            />,
            document.body
          )
        : null}
    </>
  );
}

//export default App;
