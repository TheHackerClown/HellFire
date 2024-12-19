interface InputProp {
  type?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  placeholder?: string;
  value?: string | null;
  onInput: (data: string) => void;
}

const Input = ({
  type = "text",
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
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        placeholder={placeholder}
        value={value ? value : ""}
        onChange={(e) => onInput(e.target.value)}
        className="nes-input is-dark"
      ></input>
    </>
  );
};

export default Input;
