// Import necessary modules
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import map from "../assets/image.png";
import pistol from "/pistol.png";
import akm from "/akm.png";
import jump from "../assets/parkour.png";
import Matter from "matter-js";

const GamePlayer = () => {
  const gamescreen = useRef<any>();
  let [jumpCount, setJumpCount] = useState(100);
  let [jumpChange, setjumpchange] = useState<number>(0);
  let playerbody = useRef<Matter.Body>();
  let engineref = useRef<Matter.Engine>();
  let keypressed = useRef<any>({});
  const maparr = [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 0, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
      1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1,
    ],
  ];

  useEffect(() => {
    engineref.current = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: gamescreen.current,
      engine: engineref.current,
      options: { width: window.innerWidth, height: window.innerHeight },
    });

    const blockWidth = (1920 / maparr[0].length) * 5;
    const blockHeight = gamescreen.current.height / maparr.length;
    const mapWidth = map[0].length * blockWidth;
    const mapHeight = map.length * blockHeight;

    // Create blocks based on mapData
    maparr.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1 && engineref.current) {
          // Assuming 1 represents a solid block
          const block = Matter.Bodies.rectangle(
            colIndex * blockWidth + blockWidth / 2,
            rowIndex * blockHeight + blockHeight / 2,
            blockWidth,
            blockHeight,
            {
              isStatic: true,
              label: "ground",
              render: {
                fillStyle: "#2c3e50",
              },
            }
          );
          Matter.World.add(engineref.current.world, block);
        }
      });
    });
    const walls = [
      Matter.Bodies.rectangle(
        mapWidth * mapWidth - (mapWidth * blockWidth) / 2,
        0,
        mapWidth * mapWidth + mapWidth * blockWidth * 10,
        10,
        {
          isStatic: true,
        }
      ), // Top
      Matter.Bodies.rectangle(-1920 / 4, 0, 1920 / 2, mapHeight, {
        isStatic: true,
      }), // Left
      Matter.Bodies.rectangle(
        mapWidth * mapWidth * 1.3 - blockWidth * 2.2 + blockWidth * 0.05,
        mapHeight / 2,
        1920 / 2,
        mapHeight,
        {
          isStatic: true,
        }
      ), // Right
    ];
    setjumpchange(100);
    playerbody.current = Matter.Bodies.circle(470, 200, 10);
    Matter.World.add(engineref.current.world, playerbody.current);
    Matter.World.add(engineref.current.world, walls);

    // Handle keydown and keyup events
    const handleKeyDown = (event: KeyboardEvent | any) => {
      if ("wasd".includes(event.key.toLowerCase())) {
        keypressed.current[event.key.toLowerCase()] = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent | any) => {
      if ("wasd".includes(event.key.toLowerCase())) {
        keypressed.current[event.key.toLowerCase()] = false;
      }
    };
    window.addEventListener("keydown", (e) => handleKeyDown(e));
    window.addEventListener("keyup", (e) => handleKeyUp(e));

    Matter.Runner.run(engineref.current);
    Matter.Render.run(render);
  }, []);

  useEffect(() => {
    Matter.Events.on(engineref.current, "beforeUpdate", () => {
      if (playerbody.current && keypressed.current && engineref.current) {
        let offsetX = window.innerWidth / 2 - playerbody.current.position.x;

        if (Math.abs(offsetX) > 0.001) {
          Matter.Composite.translate(engineref.current.world, {
            x: offsetX,
            y: 0,
          });
        }
        const velocityMagnitude = 5;
        const jumpVelocity = -7;
        if (keypressed.current["d"]) {
          Matter.Body.setVelocity(playerbody.current, {
            x: velocityMagnitude,
            y: playerbody.current.velocity.y,
          });
        }
        if (keypressed.current["a"]) {
          Matter.Body.setVelocity(playerbody.current, {
            x: -velocityMagnitude,
            y: playerbody.current.velocity.y,
          });
        }
        if (keypressed.current["w"] && jumpCount > 0) {
          Matter.Body.setVelocity(playerbody.current, {
            x: playerbody.current.velocity.x,
            y: jumpVelocity,
          });
          setJumpCount(jumpCount - jumpChange);
        }
        if (keypressed.current["s"]) {
          //DO SOMETHING
        }
      }
    });
  }, []);

  //Active Resize
  useEffect(() => {
    gamescreen.current.setAttribute("width", window.innerWidth);
    gamescreen.current.setAttribute("height", window.innerHeight);

    window.addEventListener("resize", () => {
      gamescreen.current.setAttribute("width", window.innerWidth);
      gamescreen.current.setAttribute("height", window.innerHeight);
    });
  }, []);
  return (
    <>
      <div className="playerdatabottomleft column nes-container is-rounded">
        <div className="row center">
          <i className="nes-icon heart icons right"></i>
          <progress
            className="nes-progress progbar is-error"
            value={100}
            max={100}
          ></progress>
        </div>
        <div className="row center">
          <i className="nes-icon star icons right"></i>
          <progress
            className="nes-progress progbar is-warning"
            value={100}
            max={100}
          ></progress>
        </div>
        <div className="row center">
          <img src={jump} alt="Double Jump" className="doublejumpicon" />
          <progress
            className="nes-progress progbar is-primary"
            value={jumpCount}
            max={100}
          ></progress>
        </div>
      </div>
      <div className="playerdatabottomright">
        <img src={map} className="minimap" />
      </div>
      <div className="playerdatatopright column nes-container is-rounded">
        <img src={pistol} className="guns" /> 1 Pistol
        <br />
        <br />
        <img src={akm} className="guns" /> 2 Akm
      </div>
      <div className="playerdatatopleft column nes-container is-rounded">
        <p>Players Left - 10</p>
      </div>
      <canvas ref={gamescreen} className="gameplayer"></canvas>
    </>
  );
};

export default GamePlayer;
