import "nes.css/css/nes.min.css";
import HellButton from "./Button";
import Input from "./Input";

function Login() {
  return (
    <>
      <div className="center">
        <Input
          id="username"
          autoComplete="username"
          autoFocus={true}
          required={true}
          placeholder="Username"
        ></Input>
        <br></br>
        <Input
          type="password"
          id="passkey"
          autoComplete="current-password"
          required={true}
          placeholder="Password"
        ></Input>
        <br></br>
        <HellButton id="preptodie" extraClass="is-error">
          Login / Register
        </HellButton>
      </div>
    </>
  );
}

export default Login;
