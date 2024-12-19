import logo from "/transparent.png";

const Header = () => {
  return (
    <>
      <nav className="center navbar">
        <img src={logo} alt="Hellfire" draggable={false} className="logo" />
      </nav>
      <br></br>
    </>
  );
};

export default Header;
