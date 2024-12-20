import { FormEvent, useRef, useState, useEffect } from "react";
import map from "../assets/image.png";
import HellButton from "./Button";
import Input from "./Input";

interface RoomProps {
  type: "create" | "join" | "beforejoin";
  fromGame: (arg0: any) => void;
  tabfunc: (e: MouseEvent | FormEvent, arg0: string) => void;
  roomid?: string | null;
  setRoomId: (arg0: string | null) => void;
}
const Room = ({ type, tabfunc, fromGame, roomid, setRoomId }: RoomProps) => {
  if (type === "beforejoin") {
    return (
      <>
        <div className="center column">
          <Input
            onInput={setRoomId}
            value={roomid}
            placeholder="Room ID"
            required={true}
          ></Input>
          <br />
          <HellButton
            extraClass="is-error"
            clickfunc={(e) => tabfunc(e, "join")}
          >
            Join
          </HellButton>
        </div>
      </>
    );
  } else {
    const chatcontainer = useRef<any>();

    const [item, setitem] = useState<string[]>([
      "name",
      "name2",
      "name3",
      "name4",
    ]);
    const [chat, setchat] = useState<string[]>([
      "name|dhruv",
      "name2|dhruv",
      "name3|dhruv",
      "name4|dhruv",
    ]);

    useEffect(() => {
      if (chatcontainer.current) {
        chatcontainer.current.scrollTop = chatcontainer.current.scrollHeight;
      }
    }, [chat]);
    const [inputvar, setinputvar] = useState("");
    const handleChatInput = (event: FormEvent | MouseEvent) => {
      if (event && inputvar !== "") {
        setinputvar("");
        setchat([...chat, `${inputvar}|dhruv`]);
      }
    };
    const [pointer, setpointer] = useState<string | null>(null);
    const handleChange = (event: FormEvent | MouseEvent) => {
      if (event) {
        setitem(item.filter((value) => value !== pointer));
        setpointer(null);
      }
    };
    return (
      <>
        <div className="column">
          <div className="nes-container is-dark with-title is-centered is-rounded column">
            <p className="title">
              Room {type === "create" ? "Control" : "Watch"} Panel
            </p>
            <div className="row">
              <div className="nes-container is-rounded is-dark with-title box">
                <p className="title">Connected Players</p>
                <hr />
                <div className="column playerlist">
                  {item.map((item, index) => (
                    <label
                      key={index}
                      className="nes-container is-dark is-rounded"
                    >
                      {type === "create" ? (
                        <input
                          type="radio"
                          className="nes-radio"
                          name="answer"
                          value={item}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setpointer(e.target.value)
                          }
                        />
                      ) : null}
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <hr />
                {type === "create" ? (
                  <>
                    <HellButton
                      extraClass="is-error kickbtn"
                      clickfunc={handleChange}
                    >
                      Kick
                    </HellButton>
                    <hr />
                    <h6>To kick players, select and click kick button</h6>
                  </>
                ) : (
                  <>
                    <br />
                    <h4>Beware of Veterans, Mortal</h4>
                  </>
                )}
              </div>
              <div className="column">
                <div className="map nes-container is-centered is-rounded is-dark with-title">
                  <p className="title">Map</p>
                  <img src={map} height={200} width={500} />
                  <br />
                  {type === "create" ? (
                    <>
                      <HellButton extraClass="is-warning roomeventbtn">
                        Re-generate Map
                      </HellButton>
                    </>
                  ) : null}
                </div>
                <div className="roomdata nes-container is-rounded is-dark with-title column">
                  <p className="title">Room Details</p>
                  <p>
                    Share Room Name : {type === "join" ? roomid : "room name"}
                  </p>
                  <p>max-player: 20</p>
                  <p>
                    role:
                    {type === "create" ? "Leader" : "Member"}
                  </p>
                </div>
                <div>
                  {type === "create" ? (
                    <>
                      <HellButton
                        extraClass="roomeventbtn is-success"
                        clickfunc={(e) => {
                          fromGame(null);
                          setRoomId(null);
                          tabfunc(e, "game");
                        }}
                      >
                        Start Match
                      </HellButton>
                      <HellButton
                        extraClass="roomeventbtn is-error"
                        clickfunc={(e) => {
                          fromGame(null);
                          setRoomId(null);
                          tabfunc(e, "none");
                        }}
                      >
                        End Match
                      </HellButton>
                    </>
                  ) : (
                    <>
                      <HellButton
                        extraClass="roomeventbtn is-success"
                        clickfunc={(e) => {
                          fromGame(null);
                          setRoomId(null);
                          tabfunc(e, "game");
                        }}
                      >
                        Ready
                      </HellButton>
                      <HellButton
                        extraClass="roomeventbtn is-error"
                        clickfunc={(e) => {
                          fromGame(null);
                          setRoomId(null);
                          tabfunc(e, "none");
                        }}
                      >
                        Leave Match
                      </HellButton>
                    </>
                  )}
                </div>
              </div>
              <div className="chatbox nes-container is-dark is-rounded is-centered with-title">
                <p className="title">Room Chat</p>
                <hr />
                <div className="globalchats column" ref={chatcontainer}>
                  {chat.map((item, index) => (
                    <>
                      <label
                        className="is-dark chatbubble nes-container is-rounded"
                        key={index}
                      >
                        <p>{item.split("|")[0]}</p>
                        <h6>by {item.split("|")[1]}</h6>
                      </label>
                    </>
                  ))}
                </div>
                <hr />
                <div className="row">
                  <textarea
                    id="textarea_field"
                    className="nes-textarea is-dark "
                    placeholder="Write Message to Room"
                    value={inputvar}
                    onChange={(e) => {
                      if (e) {
                        setinputvar(e.target.value);
                      }
                    }}
                  ></textarea>
                  <HellButton
                    extraClass="submitchat"
                    clickfunc={handleChatInput}
                  >
                    Send
                  </HellButton>
                </div>
              </div>
            </div>
          </div>
          <HellButton
            extraClass="is-primary settings"
            clickfunc={
              type === "create"
                ? (e) => {
                    fromGame("create");
                    tabfunc(e, "settings");
                  }
                : (e) => {
                    fromGame("join");
                    tabfunc(e, "settings");
                  }
            }
          >
            Change your Settings
          </HellButton>
        </div>
      </>
    );
  }
};
export default Room;
