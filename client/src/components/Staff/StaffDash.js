import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadStaff } from "../../actions/staffActions";
import AddReading from "./AddReading";
import SpinLoading from "../Loaders/SpinLoading";

class StaffDash extends Component {
  componentDidMount() {
    this.props.loadStaff();
  }

  render() {
    const { staffAuthenticated } = this.props.staff;
    const processing = this.props.processing;
    return (
      <div className="bg-light p-2">
        {staffAuthenticated ? <AddReading /> : null}
        {processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

StaffDash.propTypes = {
  staff: PropTypes.object.isRequired,
  loadStaff: PropTypes.func.isRequired,
  processing: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  staff: state.staff,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadStaff })(StaffDash);
