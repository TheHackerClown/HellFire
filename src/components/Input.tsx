interface InputProp {
  type?: string;
  id: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onInput: (data: string) => void;
}

const Input = ({
  type = "text",
  id,
  autoComplete = "",
  autoFocus = false,
  required = false,
  placeholder = "",
  value = "",
  onInput,
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
        value={value}
        onChange={(e) => onInput(e.target.value)}
        className="nes-input is-dark"
      ></input>
    </>
  );
};

export default Input;
