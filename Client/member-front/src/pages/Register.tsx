import React, { SyntheticEvent } from "react";
import { useState,useEffect } from "react";
import { Redirect } from "react-router";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:1337/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }

  

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>

      <div className="form-floating">
        <input
          type="name"
          className="form-control"
          placeholder="Username"
          required
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
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Register;
