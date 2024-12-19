import "nes.css/css/nes.min.css";
import HellButton from "./Button";
import Input from "./Input";
import { FormEvent, useContext, useState } from "react";
import { GlobalData } from "../Hellfire";

interface LoginProps {
  usernamefunc: (arg0: string) => void;
  dialogfunc: (code: number, message: string) => void;
}

function Login(props: LoginProps) {
  const { ws, fire } = useContext(GlobalData); // Getting WebSocket and fire from context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle user input for username and password
  const handleUser = (data: string) => {
    setUsername(data);
  };
  const handlePass = (data: string) => {
    setPassword(data);
  };

  // Handle form submission
  const submitevent = (
    e: FormEvent | MouseEvent,
    ws: WebSocket | null | undefined
  ) => {
    e.preventDefault();

    // Ensure WebSocket is available
    if (ws) {
      // Send login request to server via WebSocket
      fire(100, { token: username, tokpass: password });

      // Set up WebSocket message handler
      ws.onmessage = (e: MessageEvent) => {
        const data = JSON.parse(e.data);

        switch (data.code) {
          case 101:
            // Successful login or registration
            localStorage.setItem("uid", data.data.uid);
            localStorage.setItem("username", data.data.username);
            props.usernamefunc(data.data.username);
            break;

          case 110:
            // Show error message for invalid credentials
            props.dialogfunc(data.code, data.data);
            break;

          default:
            break;
        }
      };
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <>
      <form
        className="center"
        onSubmit={(e) => submitevent(e, ws)} // Handle form submit
      >
        <Input
          autoComplete="username"
          autoFocus={true}
          required={true}
          value={username}
          onInput={(e) => handleUser(e)} // Update state with input value
          placeholder="Username"
        />
        <br />
        <Input
          type="password"
          value={password}
          autoComplete="current-password"
          required={true}
          onInput={(e) => handlePass(e)} // Update state with input value
          placeholder="Password"
        />
        <br />
        <HellButton
          clickfunc={(e) => submitevent(e, ws)} // Handle button click directly
          type="submit"
          extraClass="is-error"
        >
          Login / Register
        </HellButton>
      </form>
    </>
  );
}

export default Login;
