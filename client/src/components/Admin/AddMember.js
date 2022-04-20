import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import {
  addAdmin,
  addUser,
  addMedic,
  addStaff,
} from "../../actions/adminActions";
import { returnErrors } from "../../actions/errorActions";

class AddMember extends Component {
  state = {
    name: null,
    id: null,
    password: null,
    role: "user",
    medicid: null,
    staffid: null,
  };

  static propTypes = {
    addAdmin: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    addMedic: PropTypes.func.isRequired,
    addStaff: PropTypes.func.isRequired,
    returnErrors: PropTypes.func.isRequired,
  };

  backToBasic = () => {
    this.setState({
      name: null,
      id: null,
      password: null,
      role: "user",
      medicid: null,
      staffid: null,
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

  // On submitting the form for adding member
  memberAdd = (e) => {
    e.preventDefault();
    const { name, id, password, medicid, staffid } = this.state;

    switch (this.state.role) {
      case "admin":
        const newAdmin = {
          name,
          id,
          password,
        };
        // Add admin via addAdmin action
        this.props.addAdmin(newAdmin);
        break;

      case "user":
        const newUser = {
          name,
          id,
          password,
          medicid,
          staffid,
        };
        // Add user via addUser action
        this.props.addUser(newUser);
        break;

      case "medic":
        const newMedic = {
          name,
          id,
          password,
        };
        // Add medical staff via addMedic action
        this.props.addMedic(newMedic);
        break;

      case "staff":
        const newStaff = {
          name,
          id,
          password,
        };
        // Add staff via addStaff action
        this.props.addStaff(newStaff);
        break;

      default:
        this.props.returnErrors("dude! what?");
    }

    // Set state back to initial state
    this.backToBasic();
  };

  render() {
    return (
      <div>
        <h3 className="container mb-3">Add Member</h3>
        <Form
          onSubmit={this.memberAdd.bind(this)}
          className="container-md"
          id="add"
        >
          <FormGroup>
            <Label for="memberName" className="sr-only">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              id="memberName"
              value={this.state.name ? this.state.name : ""}
              placeholder="Name"
              onChange={this.inputChange.bind(this)}
              className="mb-3"
            />

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
              placeholder="Password"
              onChange={this.inputChange.bind(this)}
              className="mb-3"
            />

            <Label for="memberRole" className="sr-only">
              Role
            </Label>
            <Input
              type="select"
              value={this.state.role}
              name="role"
              id="memberRole"
              className="mb-3"
              onChange={this.selectRole.bind(this)}
            >
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="medic">Medical Staff</option>
              <option value="admin">Admin</option>
            </Input>

            {this.state.role === "user" ? (
              <Fragment>
                <h5 className="mb-3">Assign to</h5>
                <Label for="medicid" className="sr-only">
                  Medical Staff ID
                </Label>
                <Input
                  type="text"
                  name="medicid"
                  id="medicid"
                  value={this.state.medicid ? this.state.medicid : ""}
                  className="mb-3"
                  placeholder="Medical Staff ID"
                  onChange={this.inputChange.bind(this)}
                />

                <Label for="staffid" className="sr-only">
                  Staff ID
                </Label>
                <Input
                  type="text"
                  name="staffid"
                  id="staffid"
                  value={this.state.staffid ? this.state.staffid : ""}
                  placeholder="StaffID"
                  onChange={this.inputChange.bind(this)}
                  className="mb-3"
                />
              </Fragment>
            ) : null}

            <Button type="submit" color="dark" className="mt-2 mb-5" block>
              Add
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addAdmin,
  addUser,
  addMedic,
  addStaff,
  returnErrors,
})(AddMember);
