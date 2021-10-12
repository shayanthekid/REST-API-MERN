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
        {token ? <div>{members.map((member,idx)=>{

          return <p key={idx}>{member.Name}</p>
          
          })}</div> : <div>Not Logged in</div>}
      
      </div>
    );
  
}

export default Home;
