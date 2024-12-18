interface ButtonProps {
  id: string;
  isdisabled?: boolean;
  children: string;
  extraClass?: string;
}

const HellButton = ({
  id,
  isdisabled = false,
  children,
  extraClass = "",
}: ButtonProps) => {
  return (
    <>
      <button
        type="button"
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
