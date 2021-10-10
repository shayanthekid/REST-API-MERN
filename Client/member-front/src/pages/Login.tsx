import React from 'react'

function Login() {
    return (
      <div>
        <form>
          <h1 className="h3 mb-3 fw-normal">Please Log in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
}

export default Login
