import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import TutorialsList from "./components/TutorialsList";
import AddTutorial from "./components/AddTutorial";
import SignupPage from "./pages/Signup.page";
import DashBoardPage from "./pages/Dashboard.page";
import LoginPage from "./pages/Login.page";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPasswordPage from "./pages/ForgotPassword.page";
import UpdateProfilePage from "./pages/UpdateProfile.page";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Bulletin Board
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              login
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
        {/* <h2>React Firebase Database CRUD</h2> */}
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={DashBoardPage} />
            <PrivateRoute path="/update-profile" component={UpdateProfilePage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/add" component={AddTutorial} />
            <Route path="/tutorials" component={TutorialsList} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
          </Switch>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
