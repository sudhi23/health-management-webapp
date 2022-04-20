import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withRouter } from "react-router-dom";

import { adminLogin } from "../actions/adminActions";
import { userLogin } from "../actions/userActions";
import { medicLogin } from "../actions/medicActions";
import { staffLogin } from "../actions/staffActions";
import { getids } from "../actions/tests";

import Loading from "./Loading";
import Dropdown from "./Dropdown";

export class Login extends Component {
  state = {
    id: null,
    password: null,
    role: "user",
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    adminLogin: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    medicLogin: PropTypes.func.isRequired,
    staffLogin: PropTypes.func.isRequired,
    processing: PropTypes.bool,
    getids: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getids();
  }

  backToBasic = () => {
    this.setState({
      id: null,
      password: null,
      role: "user",
    });
  };

  // Changing the state with change in inputs
  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Changing the state with change in input select
  selectRole = (e) => {
    this.setState({
      [e.target.name]: e.target.options[e.target.selectedIndex].value,
    });
  };

  login = (e) => {
    e.preventDefault();
    const { id, password } = this.state;

    switch (this.state.role) {
      case "admin":
        const adminbody = {
          id,
          password,
        };
        const adminpath = {
          history: this.props.history,
          destination: "/admin/dashboard",
        };
        this.props.adminLogin(adminbody, adminpath);
        break;

      case "user":
        const userbody = {
          id,
          password,
        };
        const userpath = {
          history: this.props.history,
          destination: "/user/dashboard",
        };
        this.props.userLogin(userbody, userpath);
        break;

      case "medic":
        const medicbody = {
          id,
          password,
        };
        const medicpath = {
          history: this.props.history,
          destination: "/medic/dashboard",
        };
        this.props.medicLogin(medicbody, medicpath);
        break;

      case "staff":
        const staffbody = {
          id,
          password,
        };
        const staffpath = {
          history: this.props.history,
          destination: "/staff/dashboard",
        };
        this.props.staffLogin(staffbody, staffpath);
        break;

      default:
        this.props.returnErrors("dude! what?");
    }

    // Set state back to initial state
    this.backToBasic();
  };

  render() {
    const processing = this.props.processing;
    return (
      <div>
        {!processing ? (
          <div className="bg-light p-2 mt-5">
            <h2 className="container mb-3">Login</h2>
            <Form
              onSubmit={this.login.bind(this)}
              className="container-md"
              id="login"
            >
              <FormGroup>
                <Label for="memberId" className="sr-only">
                  ID
                </Label>
                <Input
                  type="text"
                  name="id"
                  id="memberId"
                  value={this.state.id ? this.state.id : ""}
                  className="mb-3"
                  placeholder="ID"
                  onChange={this.inputChange.bind(this)}
                />

                <Label for="memberPassword" className="sr-only">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="memberPassword"
                  value={this.state.password ? this.state.password : ""}
                  className="mb-3"
                  placeholder="Password"
                  onChange={this.inputChange.bind(this)}
                />

                <Label for="memberRole" className="sr-only">
                  Login as
                </Label>
                <Input
                  type="select"
                  name="role"
                  id="memberRole"
                  value={this.state.role}
                  className="mb-3"
                  onChange={this.selectRole.bind(this)}
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="medic">Medical Staff</option>
                  <option value="admin">Admin</option>
                  <option value="test">Test</option>
                </Input>

                <Button type="submit" block color="dark" className="mt-2">
                  Login
                </Button>
              </FormGroup>
            </Form>
            {this.state.role === "test" ? (
              <Dropdown history={this.props.history} />
            ) : null}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  processing: state.request.processing,
});

export default withRouter(
  connect(mapStateToProps, {
    adminLogin,
    userLogin,
    medicLogin,
    staffLogin,
    getids,
  })(Login)
);
