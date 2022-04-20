import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import {
  deleteAdmin,
  deleteUser,
  deleteMedic,
  deleteStaff,
} from "../../actions/adminActions";

class DeleteMember extends Component {
  state = {
    id: "",
    role: "user",
  };

  backToBasic = () => {
    this.setState({
      id: "",
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

  // Delete
  memberDelete = (e) => {
    e.preventDefault();
    switch (this.state.role) {
      case "admin":
        this.props.deleteAdmin(this.state.id);
        break;
      case "user":
        this.props.deleteUser(this.state.id);
        break;
      case "medic":
        this.props.deleteMedic(this.state.id);
        break;
      case "staff":
        this.props.deleteStaff(this.state.id);
        break;
      default:
        console.log("dude!! what??");
    }

    // Set state back to initial state
    this.backToBasic();
  };

  render() {
    return (
      <div>
        <h3 className="container mb-3">Remove Member</h3>
        <Form
          onSubmit={this.memberDelete.bind(this)}
          className="container-md text-center"
          id="remove"
        >
          <FormGroup>
            <Label for="memberId" className="sr-only">
              ID
            </Label>
            <Input
              type="text"
              name="id"
              id="memberId"
              value={this.state.id}
              className="mb-3"
              placeholder="ID"
              onChange={this.inputChange.bind(this)}
            />

            <Label for="role" className="sr-only">
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

            <Button block type="submit" color="danger" className="mt-2">
              Remove
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

DeleteMember.propTypes = {
  deleteAdmin: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteMedic: PropTypes.func.isRequired,
  deleteStaff: PropTypes.func.isRequired,
};

/*
const mapStateToProps = (state) => ({
});
*/

export default connect(null, {
  deleteAdmin,
  deleteUser,
  deleteMedic,
  deleteStaff,
})(DeleteMember);
