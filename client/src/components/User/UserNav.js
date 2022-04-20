import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { returnErrors } from "../../actions/errorActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from "reactstrap";

import { userLogout } from "../../actions/userActions";
import Loading from "../Loading";

class UserNav extends Component {
  state = {
    isOpen: false,
    loggingOut: false,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    returnErrors: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  logMeout = () => {
    this.setState({
      loggingOut: true,
    });
    this.props.userLogout();
    this.props.history.push("/");
  };

  dashboard = () => {
    return (
      <Link className="nav-item nav-link" to="/user/dashboard">
        Dashboard
      </Link>
    );
  };

  profile = () => {
    return (
      <Link className="nav-item nav-link" to="/user/profile">
        Profile
      </Link>
    );
  };

  chooseElements = () => {
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case "/user/dashboard":
        return this.profile();
      case "/user/profile":
        return this.dashboard();
      default:
        this.props.returnErrors("dude! what?");
    }
  };

  render() {
    const { user, userAuthenticated } = this.props.user;
    return (
      <div>
        {userAuthenticated && !this.state.loggingOut ? (
          <Navbar color="dark" dark expand="sm" className="mb-4">
            <Container>
              <NavbarBrand className="display-4">Hello {user.name}</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {this.chooseElements()}
                  <Link
                    to="#"
                    onClick={this.logMeout.bind(this)}
                    className="nav-item nav-link"
                  >
                    Logout
                  </Link>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps, { returnErrors, userLogout })(UserNav)
);
