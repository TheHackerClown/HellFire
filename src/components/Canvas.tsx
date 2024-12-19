import { useEffect, useState } from "react";
import DataBar from "./DataBar";

const GamePlayer = () => {
  const [height, setheight] = useState(window.innerHeight);
  const [width, setwidth] = useState(window.innerWidth);
  const [health, sethealth] = useState(5);
  const [armor, setarmor] = useState(5);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setheight(window.innerHeight);
      setwidth(window.innerWidth);
    });
  }, [setheight, setwidth]);

  function attack(val: number) {
    sethealth(health - val);
    setarmor(armor - val);
  }
  attack(0); //placeholder for typescript
  return (
    <>
      <div className="gamesection column nes-container is-rounded">
        <DataBar type="health" totalvalue={5} currvalue={health}></DataBar>
        <DataBar type="armor" totalvalue={5} currvalue={armor}></DataBar>
      </div>
      <canvas height={height} width={width} className="gameplayer">
        Canvas is not supported
      </canvas>
    </>
  );
};

export default GamePlayer;
