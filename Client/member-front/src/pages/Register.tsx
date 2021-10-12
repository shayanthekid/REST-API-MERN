import React, { SyntheticEvent } from "react";
import { useState,useEffect } from "react";
import { Redirect } from "react-router";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState({ status: false, message: "" });
  
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();


    const PARAMS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    

    await fetch("http://localhost:1337/users/register",PARAMS)
    .then(res=>{if(res.status===201) setRedirect(true)})
    .catch(err =>{
      if(err.status ===500) setError({
        status:true,
        message:"Not successfull. Please try again"
      })
    })


  };
  if (redirect) {
    return <Redirect to="/login" />;
  }

  

  return (
    <form onSubmit={submit}>
      {error.status ? <h1 color="red">{error.message}</h1> : ""}
      <h1 className="h3 mb-3 fw-normal">Please Register</h1>

      <div>
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
      <div>
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
        Register
      </button>
    </form>
  );
}

export default Register;
