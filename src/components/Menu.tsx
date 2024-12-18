import HellButton from "./Button";
import MenuLabel from "./Label";

interface MenuProps {
  name: string;
}

function Menu({ name }: MenuProps) {
  return (
    <>
      <div className="center">
        <MenuLabel name={name}></MenuLabel>
        <br></br>
        <HellButton id="create">Create Room</HellButton>
        <br></br>
        <HellButton id="join">Join Room</HellButton>
        <br></br>
        <HellButton id="none" isdisabled={true}>
          Marketplace
        </HellButton>
        <br></br>
        <HellButton id="settings" extraClass="is-warning">
          Settings
        </HellButton>
        <br></br>
        <HellButton id="logout" extraClass="is-error">
          Log Out
        </HellButton>
      </div>
    </>
  );
}

export default Menu;
