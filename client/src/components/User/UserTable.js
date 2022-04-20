import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table } from "reactstrap";

class UserTable extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { readings } = this.props.user;
    return (
      <div>
        <h3 className="container mb-3">View</h3>
        <Table className="container mb-4 bg-gray">
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Pulse</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {readings.map(({ date, temperature, pulse, prescription }) => (
              <tr key={date}>
                <td>{temperature}</td>
                <td>{pulse}</td>
                <td>{prescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(UserTable);
