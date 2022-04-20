import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadUser } from "../../actions/userActions";
import UserTable from "./UserTable";

class UserDash extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    const { userAuthenticated } = this.props.user;
    return (
      <div className="bg-light p-2">
        {userAuthenticated ? <UserTable /> : null}
      </div>
    );
  }
}

UserDash.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(UserDash);
