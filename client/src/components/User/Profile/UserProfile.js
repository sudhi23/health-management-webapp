import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadUser } from "../../../actions/userActions";
import SpinLoading from "../../Loaders/SpinLoading";
import ChangePassword from "./ChangePassword";

export class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    processing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { userAuthenticated } = this.props.user;
    return (
      <div className="bg-light p-2">
        {userAuthenticated ? <ChangePassword /> : null}
        {this.props.processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadUser })(UserProfile);
