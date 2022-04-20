import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Input, Label, Button, Form, FormGroup } from "reactstrap";

import { getReading } from "../actions/tests";

export class Dropdown extends Component {
  state = {
    id: null,
  };

  static propTypes = {
    test: PropTypes.object.isRequired,
    getReading: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  selectID = (e) => {
    this.setState({
      [e.target.name]: e.target.options[e.target.selectedIndex].value,
    });
  };

  getReadingforID = (e) => {
    e.preventDefault();
    this.props.getReading(this.state.id);
    this.props.history.push("/test");
  };

  render() {
    const { ids } = this.props.test;
    return (
      <div>
        <Form
          onSubmit={this.getReadingforID.bind(this)}
          className="container-md text-center mt-5"
          id="getReading"
        >
          <FormGroup>
            <Label for="selectid" className="sr-only">
              Select ID
            </Label>
            <Input
              type="select"
              name="id"
              id="selectid"
              value={this.state.id}
              className="mb-3"
              onChange={this.selectID.bind(this)}
            >
              <option value={null}>Select ID</option>
              {ids.map((id) => (
                <option value={id} key={id}>
                  {id}
                </option>
              ))}
            </Input>
            <Button block type="submit" color="dark" className="mt-2 mb-3">
              Get Readings
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, { getReading })(Dropdown);
