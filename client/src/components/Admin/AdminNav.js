import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from "reactstrap";

import Loading from "../Loading";
import { returnErrors } from "../../actions/errorActions";
import { adminLogout } from "../../actions/adminActions";

export class AdminNav extends Component {
  state = {
    isOpen: false,
    loggingOut: false,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    returnErrors: PropTypes.func.isRequired,
    adminLogout: PropTypes.func.isRequired,
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
    this.props.adminLogout();
    this.props.history.push("/");
  };

  dashboard = () => {
    return (
      <Link className="nav-item nav-link" to="/admin/dashboard">
        Dashboard
      </Link>
    );
  };

  profile = () => {
    return (
      <Link className="nav-item nav-link" to="/admin/profile">
        Profile
      </Link>
    );
  };

  chooseElements = () => {
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case "/admin/dashboard":
        return this.profile();
      case "/admin/profile":
        return this.dashboard();
      default:
        this.props.returnErrors("dude! what?");
    }
  };

  render() {
    const { admin, adminAuthenticated } = this.props.admin;
    return (
      <div>
        {adminAuthenticated && !this.state.loggingOut ? (
          <Navbar color="dark" dark expand="sm" className="mb-4">
            <Container>
              <NavbarBrand className="display-4">
                Hello {admin.name}
              </NavbarBrand>
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
  admin: state.admin,
});

export default withRouter(
  connect(mapStateToProps, { returnErrors, adminLogout })(AdminNav)
);
