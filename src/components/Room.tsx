import map from "../assets/image.png";

const Room = () => {
  const item = ["name", "name2", "name3", "name4"];
  const isowner = true;
  return (
    <div>
      <div>
        {item.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
      <div>
        <img src={map} />
      </div>
      <div>
        system: room name max-player: 7 role: {isowner ? "Leader" : "Member"}
      </div>
      <div>{item.length} / 7 Players joined</div>
    </div>
  );
};

export default Room;
