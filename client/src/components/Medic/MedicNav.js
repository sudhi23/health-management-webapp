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

import { returnErrors } from "../../actions/errorActions";
import { medicLogout } from "../../actions/medicActions";
import Loading from "../Loading";

export class MedicNav extends Component {
  state = {
    isOpen: false,
    loggingOut: false,
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    returnErrors: PropTypes.func.isRequired,
    medicLogout: PropTypes.func.isRequired,
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
    this.props.medicLogout();
    this.props.history.push("/");
  };

  dashboard = () => {
    return (
      <Link className="nav-item nav-link" to="/medic/dashboard">
        Dashboard
      </Link>
    );
  };

  profile = () => {
    return (
      <Link className="nav-item nav-link" to="/medic/profile">
        Profile
      </Link>
    );
  };

  chooseElements = () => {
    const { pathname } = this.props.history.location;
    switch (pathname) {
      case "/medic/dashboard":
        return this.profile();
      case "/medic/profile":
        return this.dashboard();
      default:
        this.props.returnErrors("dude! what?");
    }
  };

  render() {
    const { medic, medicAuthenticated } = this.props.medic;
    return (
      <div>
        {medicAuthenticated && !this.state.loggingOut ? (
          <Navbar color="dark" dark expand="sm" className="mb-4">
            <Container>
              <NavbarBrand className="display-4">
                Hello {medic.name}
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
  medic: state.medic,
});

export default withRouter(
  connect(mapStateToProps, { returnErrors, medicLogout })(MedicNav)
);
