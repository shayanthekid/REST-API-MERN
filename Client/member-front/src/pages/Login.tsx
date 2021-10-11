import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  function setStorage(userToken: string) {
    localStorage.setItem("token", JSON.stringify(userToken));
  }

  function getStorage(token: string): boolean {
    const Token = JSON.parse(localStorage.getItem("token") || "{}");
    console.log(Token);

    if (Token === token) {
      return true;
    } else {
      return false;
    }
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:1337/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const content = await response.json();

    setToken(content.token);
  };
  setStorage(token);

  if (!!token) {
       return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Log in</h1>

        <div className="form-floating">
          <input
            type="name"
            className="form-control"
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
