import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateAccessToken, getAccessToken } from "../Token";
import { setInterval } from "timers";
function Nav() {
  const [token, setToken] = useState<string>("");
  const [render,setRender]= useState(false);
  useEffect(()=>{
      const localStorageToken = JSON.parse(localStorage.getItem("token")!);
      if (localStorageToken) {
        validateAccessToken(localStorageToken)
          .then((res) => {
            if (res.status === 200) {
              setToken(localStorageToken);
              setRender(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
  
  },[])

  const renderfunction=()=>{

if(render){
return (
  <div className="container-fluid">
    <Link to="/" className="navbar-brand">
      Home
    </Link>

    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link to="/create" className="nav-link">
            Create Member
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/edit" className="nav-link">
            Edit Member
          </Link>
        </li>
      </ul>
      <form className="d-flex" onSubmit={logout}>
        <button className="btn btn-outline-danger" type="submit">
          Log out
        </button>
      </form>
    </div>
  </div>
);
} else{
  return (
    <div className="container-fluid">
      <Link to="/" className="navbar-brand">
        Home
      </Link>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Create Member
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/edit" className="nav-link">
              Edit Member
            </Link>
          </li>
        </ul>
       
      </div>
    </div>
  );
}

  }
  const logout = ()=>{
    localStorage.clear();
    setRender(false);
  }

  console.log(token);
  
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
       {renderfunction()}
      </nav>
    </div>
  );
}

export default Nav;
