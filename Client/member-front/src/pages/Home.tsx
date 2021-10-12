import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { validateAccessToken, getMembers } from "../Token";

interface IState {
 
    Name?: string;
    Email?: string;
    Address?: string;
    Birthdate?: Date;
    Entrancedate?: Date;
 
}

function Home() {
  const [token, setToken] = useState<string>("");
  const [members, setMembers] = useState<IState[]>([]);

  useEffect(() => {
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

    getMembers().then(async (res) => {
      const content = await res.json();
      setMembers(content.members);
    });
  }, []);

 
    return (
      <div>
        <h2>All Members</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Birthdate</th>
              <th>Entrancedate</th>
            </tr>
          </thead>
          <tbody>
        
            {token ? (
              members.map((member) => (
                <tr>
                  <td>{member.Name}</td>
                  <td>{member.Email}</td>
                  <td>{member.Address}</td>
                  <td>{member.Birthdate}</td>
                  <td>{member.Entrancedate}</td>
                </tr>
              ))
            ) : (
              <div className="Error-message">Not Logged in</div>
            )}
          </tbody>
        </table>
      </div>
    );
  
}

export default Home;
