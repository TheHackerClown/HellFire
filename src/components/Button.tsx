interface ButtonProps {
  id: string;
  isdisabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: string;
  extraClass?: string;
}

const HellButton = ({
  id,
  isdisabled = false,
  children,
  type = "button",
  extraClass = "",
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        className={
          isdisabled
            ? `nes-btn is-disabled ${extraClass}`
            : `nes-btn ${extraClass}`
        }
        id={id}
      >
        {children}
      </button>
    </>
  );
};

export default HellButton;
