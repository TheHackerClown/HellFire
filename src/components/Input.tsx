interface InputProp {
  type?: string;
  id: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  placeholder?: string;
}

const Input = ({
  type = "text",
  id,
  autoComplete = "",
  autoFocus = false,
  required = false,
  placeholder = "",
}: InputProp) => {
  return (
    <>
      <input
        type={type}
        id={id}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        placeholder={placeholder}
        className="nes-input is-dark"
      ></input>
    </>
  );
};

export default Input;
