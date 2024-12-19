import { FormEvent } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: string;
  extraClass?: string;
  clickfunc?: (e: MouseEvent | FormEvent) => void;
}

const HellButton = ({
  children,
  type = "button",
  extraClass = "",
  clickfunc,
}: ButtonProps) => {
  if (clickfunc) {
    return (
      <>
        <button
          type={type}
          className={extraClass ? `nes-btn ${extraClass}` : "nes-btn"}
          onClick={(e) => clickfunc(e)}
        >
          {children}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          type={type}
          className={extraClass ? `nes-btn ${extraClass}` : "nes-btn"}
        >
          {children}
        </button>
      </>
    );
  }
};

export default HellButton;
