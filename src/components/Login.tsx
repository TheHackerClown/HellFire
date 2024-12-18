import "nes.css/css/nes.min.css";
import HellButton from "./Button";
import Input from "./Input";
import { FormEvent, useState } from "react";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleuser = (data: string) => {
    console.log(data);
    setusername(data);
  };
  const handlepass = (data: string) => {
    console.log(data);
    setpassword(data);
  };
  const submitevent = (e: FormEvent) => {
    e.preventDefault();
    //document.getElementById("alert-box").showModal();
    //signin
  };
  return (
    <>
      <form
        className="center"
        onSubmit={(e) => {
          submitevent(e);
        }}
      >
        <Input
          id="username"
          autoComplete="username"
          autoFocus={true}
          required={true}
          value={username}
          onInput={handleuser}
          placeholder="Username"
        ></Input>
        <br></br>
        <Input
          type="password"
          id="passkey"
          value={password}
          autoComplete="current-password"
          required={true}
          onInput={handlepass}
          placeholder="Password"
        ></Input>
        <br></br>
        <HellButton type="submit" id="preptodie" extraClass="is-error">
          Login / Register
        </HellButton>
      </form>
    </>
  );
}

export default Login;
