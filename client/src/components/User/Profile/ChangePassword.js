import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

import { changePassword } from "../../../actions/userActions";

class ChangePassword extends Component {
  state = {
    passwordFormVisible: false,
    oldPassword: null,
    newPassword1: null,
    newPassword2: null,
  };

  static propTypes = {
    changePassword: PropTypes.func.isRequired,
  };

  backToBasic = () => {
    this.setState({
      oldPassword: null,
      newPassword1: null,
      newPassword2: null,
    });
  };

  passwordForm = () => {
    this.setState({
      passwordFormVisible: !this.state.passwordFormVisible,
    });
  };

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  passwordChange = (e) => {
    e.preventDefault();
    const passwords = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword1,
    };
    this.props.changePassword(passwords);
    this.backToBasic();
  };

  render() {
    return (
      <div>
        <div className="container" onClick={this.passwordForm}>
          <h3 style={{ cursor: "pointer" }}>Change Password</h3>
        </div>
        {this.state.passwordFormVisible ? (
          <Form
            className="container-md"
            onSubmit={this.passwordChange.bind(this)}
          >
            <FormGroup>
              <Label for="oldPassword" className="sr-only">
                Current Password
              </Label>
              <Input
                type="password"
                name="oldPassword"
                id="oldPassword"
                value={this.state.oldPassword ? this.state.oldPassword : ""}
                placeholder="Current Password"
                onChange={this.inputChange.bind(this)}
                className="mb-3"
              />

              <Label for="newPassword1" className="sr-only">
                New Password
              </Label>
              <Input
                type="password"
                name="newPassword1"
                id="newPassword1"
                value={this.state.newPassword1 ? this.state.newPassword1 : ""}
                placeholder="New Password"
                onChange={this.inputChange.bind(this)}
                className="mb-3"
              />

              <Label for="newPassword2" className="sr-only">
                Confirm New Password
              </Label>
              <Input
                type="password"
                name="newPassword2"
                id="newPassword2"
                value={this.state.newPassword2 ? this.state.newPassword2 : ""}
                placeholder="Confirm New Password"
                onChange={this.inputChange.bind(this)}
                className="mb-3"
              />

              {this.state.newPassword1 === this.state.newPassword2 ? (
                this.state.oldPassword && this.state.newPassword1 ? (
                  <Button
                    block
                    type="submit"
                    color="dark"
                    className="mt-2 mb-5"
                  >
                    Change Password
                  </Button>
                ) : null
              ) : (
                <Alert color="danger">Passwords don't match</Alert>
              )}
            </FormGroup>
          </Form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
