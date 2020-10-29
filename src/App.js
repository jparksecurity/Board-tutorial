import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Bulletin Board
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>React Firebase Database CRUD</h2>
        <Switch>
          <Route path="/" component={Signup} />
          <Route path="/add" component={AddTutorial} />
          <Route path="/tutorials" component={TutorialsList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
