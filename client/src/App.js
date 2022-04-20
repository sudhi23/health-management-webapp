import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/Login";
import SpinLoading from "./components/Loaders/SpinLoading";
import Dashboard from "./components/Dashboard/Dashboard";

// Admin route components
import AdminDash from "./components/Admin/AdminDash";
import AdminNav from "./components/Admin/AdminNav";
import AdminProfile from "./components/Admin/Profile/AdminProfile";

// User route components
import UserDash from "./components/User/UserDash";
import UserNav from "./components/User/UserNav";
import UserProfile from "./components/User/Profile/UserProfile";

// Medical Staff route components
import MedicDash from "./components/Medic/MedicDash";
import MedicNav from "./components/Medic/MedicNav";
import MedicProfile from "./components/Medic/Profile/MedicProfile";

// Staff route components
import StaffDash from "./components/Staff/StaffDash";
import StaffNav from "./components/Staff/StaffNav";
import StaffProfile from "./components/Staff/Profile/StaffProfile";

import AlertModal from "./components/AlertModal";
import SuccessModal from "./components/SuccessModal";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./CSS/Rotate.css";
import "./CSS/Spin.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <h1 className="display-3 p-1 bg-light mb-3">Health Record</h1>
            <AlertModal />
            <SuccessModal />
            <Switch>
              <Route path="/" exact>
                <h1>Home Page</h1>
                <Login />
              </Route>

              <Route path="/loading">
                <SpinLoading />
              </Route>

              <Route path="/test">
                <Dashboard />
              </Route>

              <Route path="/user">
                <Route path="/user/profile">
                  <UserNav />
                  <h1>User Profile</h1>
                  <UserProfile />
                </Route>
                <Route path="/user/dashboard">
                  <UserNav />
                  <h1>User Dashboard</h1>
                  <UserDash />
                </Route>
              </Route>

              <Route path="/medic">
                <Route path="/medic/profile">
                  <MedicNav />
                  <h1>Medical Staff Profile</h1>
                  <MedicProfile />
                </Route>
                <Route path="/medic/dashboard">
                  <MedicNav />
                  <h1>Medical Staff Dashboard</h1>
                  <MedicDash />
                </Route>
              </Route>

              <Route path="/staff">
                <Route path="/staff/profile">
                  <StaffNav />
                  <h1>Staff Profile</h1>
                  <StaffProfile />
                </Route>
                <Route path="/staff/dashboard">
                  <StaffNav />
                  <h1>Staff Dashboard</h1>
                  <StaffDash />
                </Route>
              </Route>

              <Route path="/admin">
                <Route path="/admin/profile">
                  <AdminNav />
                  <h1>Admin Profile</h1>
                  <AdminProfile />
                </Route>
                <Route path="/admin/dashboard">
                  <AdminNav />
                  <h1 className="p-1">Admin Dashboard</h1>
                  <AdminDash />
                </Route>
              </Route>
            </Switch>
          </BrowserRouter>
          <div className="foot"></div>
          <footer className="footer bg-tricolor">
            <div className="container">
              <span className="text-muted">Developed by : kA&reg;mA</span>
            </div>
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
