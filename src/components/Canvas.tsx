import { FormEvent, useEffect, useRef, useState } from "react";
import DataBar from "./DataBar";
import HellButton from "./Button";

interface GamePlayerProps {
  tabfunc: (e: FormEvent | MouseEvent, data: string | undefined) => void;
}

const GamePlayer = ({ tabfunc }: GamePlayerProps) => {
  const gamecanvas = useRef<any>();
  const [health, sethealth] = useState(5);
  const [armor, setarmor] = useState(5);
  useEffect(() => {
    gamecanvas.current.setAttribute("width", window.innerWidth);
    gamecanvas.current.setAttribute("height", window.innerHeight);
    window.addEventListener("resize", () => {
      gamecanvas.current.setAttribute("width", window.innerWidth);
      gamecanvas.current.setAttribute("height", window.innerHeight);
    });
    sethealth(5);
    setarmor(5);
  }, [gamecanvas.current, setarmor, sethealth]);

  return (
    <>
      <div className="gamesection column nes-container is-rounded">
        <DataBar type="health" totalvalue={5} currvalue={health}></DataBar>
        <DataBar type="armor" totalvalue={5} currvalue={armor}></DataBar>
      </div>
      <HellButton
        extraClass="gamesection"
        clickfunc={(e) => {
          tabfunc(e, "aftergame");
        }}
      >
        End Match
      </HellButton>
      <canvas className="gameplayer" ref={gamecanvas}>
        Canvas is not supported
      </canvas>
    </>
  );
};

export default GamePlayer;
