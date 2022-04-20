import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadAdmin } from "../../../actions/adminActions";
import SpinLoading from "../../Loaders/SpinLoading";
import ChangePassword from "./ChangePassword";

class AdminProfile extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    loadAdmin: PropTypes.func.isRequired,
    processing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.loadAdmin();
  }

  render() {
    const { adminAuthenticated } = this.props.admin;
    const processing = this.props.processing;
    return (
      <div className="bg-light p-2">
        {adminAuthenticated ? <ChangePassword /> : null}

        {processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  admin: state.admin,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadAdmin })(AdminProfile);
