import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateAccessToken, getAccessToken } from "../Token";
function Nav() {
  const [token, setToken] = useState<string>("");
  
  useEffect(()=>{
     setToken(JSON.stringify(localStorage.getItem("mytime")));
  
  },[])
     console.log(token);
  const logout = ()=>{
    localStorage.clear();
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Home
          </Link>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {token ? <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li> : "" }
             {token ? <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li> : "" }
             
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
            {token ?  <form className="d-flex">
              
              <button className="btn btn-outline-danger" onClick={logout}>
                Log out
              </button>
            </form> : "" }
           
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
