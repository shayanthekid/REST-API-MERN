import React, { SyntheticEvent } from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
function Home() {
  interface IState {
    Members: {
      Name?: string;
      Email?: string;
      Address?: string;
      Birthdate?: Date;
      Entrancedate?: Date;
    }[];
  }

  const [token, setToken] = useState("");
  const [members, setMembers] = useState<IState["Members"]>([]);

 

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token") || "{}"));
  });

  useEffect(()=>{
      async function displayMembers() {
        
       const response = await fetch(
         "http://localhost:1337/members/getAllMembers",
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       const content = await response.json();
      
         console.log(content.members);
         
       setMembers(content.members);
    
       
     };
  displayMembers();
  })


  
  if (token === "") {
    return <div>Not logged in</div>;
  } else {

    return <div>


      Home
{members.map((member)=>{
return <p>{member.Name}</p>
})}      
      
      
      
      </div>;
  }
}

export default Home;
