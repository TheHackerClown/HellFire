import HellButton from "./Button";

interface DialogProps {
  code: number;
  data: string;
}

const Dialog = ({ code, data }: DialogProps) => {

    
  return (
    <dialog className="nes-dialog is-dark is-rounded" id="alert-box">
      <form method="dialog" className="center">
        <p className="title" id="err-code">
          {code}
        </p>
        <p id="err-message">{data}</p>
        <menu className="dialog-menu">
          <HellButton id="dialog-button" extraClass="is-error">
            Ok
          </HellButton>
        </menu>
      </form>
    </dialog>
  );
};

export default Dialog;
