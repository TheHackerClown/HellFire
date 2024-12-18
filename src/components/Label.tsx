interface MenuLabelProps {
  name: string;
}

const MenuLabel = ({ name }: MenuLabelProps) => {
  return (
    <>
      <h3>
        Welcome, <h1 id="intro_text">{name}</h1>
      </h3>
    </>
  );
};

export default MenuLabel;
