import { FormEvent, useEffect, useRef } from "react";
import HellButton from "./Button";

interface DialogProps {
  code: number;
  showModal: boolean;
  data: string;
  hideModal: (e: MouseEvent | FormEvent) => void;
}

const Dialog = ({ code, showModal, data, hideModal }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show or hide the dialog programmatically
  useEffect(() => {
    if (showModal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showModal]);
  return (
    <dialog className="nes-dialog is-dark is-rounded" ref={dialogRef}>
      <form method="dialog" className="center">
        <p className="title" id="err-code">
          {code}
        </p>
        <p id="err-message">{data}</p>
        <menu className="dialog-menu">
          <HellButton clickfunc={(e) => hideModal(e)} extraClass="is-error">
            Ok
          </HellButton>
        </menu>
      </form>
    </dialog>
  );
};

export default Dialog;
