import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { validateAccessToken } from "../Token";

function Create() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Birthdate, setBirthdate] = useState("");
  const [Entrancedate, setEntrance] = useState("");
  const [token, setToken] = useState<string>("");
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:1337/members/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Address,
        Birthdate,
        Entrancedate,
      }),
    });
  };

useEffect(()=>{
    const localStorageToken = JSON.parse(localStorage.getItem("token")!);
    if (localStorageToken) {
      validateAccessToken(localStorageToken)
        .then((res) => {
          if (res.status === 200) {
            setToken(localStorageToken);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
})

  return (
    <div>
      {token ? (
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Create new Members</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              placeholder="Birthdate"
              required
              onChange={(e) => {
                setBirthdate(e.target.value);
              }}
            />
          </div>
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              placeholder="Entrancedate"
              required
              onChange={(e) => {
                setEntrance(e.target.value);
              }}
            />
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div>Not Logged in</div>
      )}
    </div>
  );
}

export default Create;
