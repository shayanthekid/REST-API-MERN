import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import create from "./pages/create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin">
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/create" component={create} />
          <Route path="/edit" component={Edit} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
