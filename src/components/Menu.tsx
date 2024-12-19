import { FormEvent, useContext } from "react";
import HellButton from "./Button";
import { GlobalData } from "../Hellfire";
interface MenuProps {
  name: string | null;
  showModal: boolean;
  tabfunc: (e: FormEvent | MouseEvent, tab?: string) => void;
  dialogfunc: (code: number, message: string) => void;
  usernamefunc: (arg0: string | null) => void;
}

function Menu({ name, tabfunc, usernamefunc }: MenuProps) {
  const { ws, fire } = useContext(GlobalData);

  function logouteffect(
    e: FormEvent | MouseEvent,
    ws: WebSocket | undefined | null
  ) {
    if (e && ws && localStorage.getItem("uid") && e) {
      fire(111, localStorage.getItem("uid"));
      localStorage.clear();
      sessionStorage.clear();
      usernamefunc(null);
      ws.onmessage = (e: MessageEvent) => {
        let data = JSON.parse(e.data);
        switch (data.code) {
          case 111:
            localStorage.clear();
            sessionStorage.clear();
            usernamefunc(null);
            break;
          default:
            break;
        }
      };
    }
  }

  return (
    <>
      <div className="center">
        <h3>
          Welcome, <b>{name}</b>
        </h3>
        <br></br>
        <HellButton clickfunc={(e) => tabfunc(e, "create")}>
          Create Room
        </HellButton>
        <br></br>
        <HellButton clickfunc={(e) => tabfunc(e, "beforejoin")}>
          Join Room
        </HellButton>
        <br></br>
        <HellButton clickfunc={(e) => tabfunc(e, "leaderboard")}>
          LeaderBoard
        </HellButton>
        <br></br>
        <HellButton
          clickfunc={(e) => tabfunc(e, "settings")}
          extraClass="is-warning"
        >
          Settings
        </HellButton>
        <br></br>
        <HellButton
          clickfunc={(e) => logouteffect(e, ws)}
          extraClass="is-error"
        >
          Log Out
        </HellButton>
      </div>
    </>
  );
}

export default Menu;
