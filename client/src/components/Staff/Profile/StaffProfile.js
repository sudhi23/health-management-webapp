import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadStaff } from "../../../actions/staffActions";
import SpinLoading from "../../Loaders/SpinLoading";
import ChangePassword from "./ChangePassword";

export class StaffProfile extends Component {
  static propTypes = {
    staff: PropTypes.object.isRequired,
    loadStaff: PropTypes.func.isRequired,
    processing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.loadStaff();
  }

  render() {
    const { staffAuthenticated } = this.props.staff;
    return (
      <div className="bg-light p-2">
        {staffAuthenticated ? <ChangePassword /> : null}
        {this.props.processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staff: state.staff,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadStaff })(StaffProfile);
