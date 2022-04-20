import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadAdmin } from "../../actions/adminActions";
import AddMember from "./AddMember";
import DeleteMember from "./DeleteMember";
import SpinLoading from "../Loaders/SpinLoading";

class AdminDash extends Component {
  componentDidMount() {
    this.props.loadAdmin();
  }

  render() {
    const { adminAuthenticated } = this.props.admin;
    const processing = this.props.processing;
    return (
      <div className="bg-light p-2">
        {adminAuthenticated ? (
          <Fragment>
            <AddMember />
            <DeleteMember />
          </Fragment>
        ) : null}
        {processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

AdminDash.propTypes = {
  admin: PropTypes.object.isRequired,
  loadAdmin: PropTypes.func.isRequired,
  processing: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadAdmin })(AdminDash);
