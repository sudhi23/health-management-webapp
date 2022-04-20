import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { addReading } from "../../actions/staffActions";

class AddReading extends Component {
  state = {
    id: "",
    temperature: "",
    pulse: "",
  };

  backToBasic = () => {
    this.setState({
      id: "",
      temperature: "",
      pulse: "",
    });
  };

  // Changing the state with change in inputs
  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Changing the state with change in input select
  selectUser = (e) => {
    this.setState({
      [e.target.name]: e.target.options[e.target.selectedIndex].value,
    });
  };

  // on submitting the form
  readingAdd = (e) => {
    e.preventDefault();

    const reading = {
      id: this.state.id,
      temperature: this.state.temperature,
      pulse: this.state.pulse,
    };

    this.props.addReading(reading);

    this.backToBasic();
  };

  render() {
    const { assigned_users } = this.props.staff.staff;
    return (
      <div>
        <h3 className="container mb-3">Take Readings</h3>
        <Form
          onSubmit={this.readingAdd.bind(this)}
          className="container-md text-center"
          id="takeReadings"
        >
          <FormGroup>
            <Label for="id" className="sr-only">
              ID
            </Label>
            <Input
              type="select"
              value={this.state.id}
              name="id"
              id="id"
              className="mb-3"
              onChange={this.selectUser.bind(this)}
            >
              <option value={null}>Select assigned user</option>
              {assigned_users.map((id) => (
                <option value={id} key={id}>
                  {id}
                </option>
              ))}
            </Input>

            <Label for="temp" className="sr-only">
              Temperature
            </Label>
            <Input
              type="number"
              name="temperature"
              id="temp"
              value={this.state.temperature}
              className="mb-3"
              placeholder="Temperature"
              onChange={this.inputChange.bind(this)}
            />

            <Label for="pulse" className="sr-only">
              Pulse
            </Label>
            <Input
              type="number"
              name="pulse"
              id="pulse"
              value={this.state.pulse}
              className="mb-3"
              placeholder="Pulse"
              onChange={this.inputChange.bind(this)}
            />

            <Button block type="submit" color="dark" className="mt-2 mb-3">
              Add
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

AddReading.propTypes = {
  staff: PropTypes.object.isRequired,
  addReading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  staff: state.staff,
});

export default connect(mapStateToProps, { addReading })(AddReading);
