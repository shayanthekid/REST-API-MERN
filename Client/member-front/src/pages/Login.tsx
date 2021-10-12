import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import { setAccessToken } from "../Token";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [token, setToken] = useState("");

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

    if (response.status === 200) {
      setAccessToken(content.token);
      setError({ status: false, message: "" });
      setRedirect(true);
    } else if (response.status === 401) {
      setError({ status: true, message: "Invalid Credentials" });
      console.log("Unauthorized User");
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      {error.status ? <h1 color="red">{error.message}</h1> : ""}
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
