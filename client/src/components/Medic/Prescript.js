import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { getUser, prescript } from "../../actions/medicActions";

class Prescript extends Component {
  state = {
    dropdownOpen: false,
    id: null,
    prescription: null,
  };

  static propTypes = {
    medic: PropTypes.object.isRequired,
    prescript: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  // dropdown toggle
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  // set back to initial state
  backToBasic = () => {
    this.setState({
      id: null,
      prescription: null,
    });
  };

  // Changing the state with change in inputs
  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // selecting from dropdown
  userSelect = (id) => {
    this.setState({
      id,
    });
    this.props.getUser(id);
  };

  // write a prescription
  suggest = (e) => {
    e.preventDefault();
    const readings = this.props.readings;
    readings[0].prescription = this.state.prescription;
    const suggestion = {
      id: this.state.id,
      readings,
    };
    this.props.prescript(suggestion);
    this.backToBasic();
  };

  render() {
    const { assigned_users } = this.props.medic.medic;
    return (
      <div>
        <h3 className="container mb-3">View Readings</h3>
        <Dropdown
          className="container mb-3"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>
            {this.state.id ? this.state.id : "Assigned Users"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>User ID</DropdownItem>
            {assigned_users.map((id) => (
              <DropdownItem key={id} onClick={this.userSelect.bind(this, id)}>
                {id}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {this.state.id ? (
          <Fragment>
            <Table className="container-md mb-3 bg-gray">
              <thead>
                <tr>
                  <th>Temperature</th>
                  <th>Pulse</th>
                  <th>Prescription</th>
                </tr>
              </thead>
              <tbody>
                {this.props.readings.map(
                  ({ date, temperature, pulse, prescription }) => (
                    <tr key={date}>
                      <td>{temperature}</td>
                      <td>{pulse}</td>
                      <td>{prescription}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>

            <h3 className="container mb-3">Prescribe</h3>
            <Form
              onSubmit={this.suggest.bind(this)}
              className="container-md text-center"
              id="takeReadings"
            >
              <FormGroup>
                <Label for="Prescription" className="sr-only">
                  Prescription
                </Label>
                <Input
                  type="textarea"
                  name="prescription"
                  id="prescription"
                  value={this.state.prescription ? this.state.prescription : ""}
                  className="mb-3"
                  placeholder="Prescription"
                  onChange={this.inputChange.bind(this)}
                />
                <Button type="submit" block color="dark" className="mt-2 mb-3">
                  Suggest
                </Button>
              </FormGroup>
            </Form>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  medic: state.medic,
  readings: state.medic.user.readings,
});

export default connect(mapStateToProps, { getUser, prescript })(Prescript);
