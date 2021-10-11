import React from 'react'
import { useState,useEffect } from "react";
import { Redirect } from "react-router";
function Home() {

    const [token, setToken] = useState("");
   
    useEffect(()=>{
    setToken(JSON.parse(localStorage.getItem("token") || "{}"));

    })

  
  if(token===""){
      return <div>Not logged in</div>
  }
  else{
    return <div>Home</div>;
  }
  
}

export default Home
