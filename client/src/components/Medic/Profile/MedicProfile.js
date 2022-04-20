import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loadMedic } from "../../../actions/medicActions";
import SpinLoading from "../../Loaders/SpinLoading";
import ChangePassword from "./ChangePassword";

export class MedicProfile extends Component {
  static propTypes = {
    medic: PropTypes.object.isRequired,
    loadMedic: PropTypes.func.isRequired,
    processing: PropTypes.bool,
  };

  componentDidMount() {
    this.props.loadMedic();
  }

  render() {
    const { medicAuthenticated } = this.props.medic;
    return (
      <div className="bg-light p-2">
        {medicAuthenticated ? <ChangePassword /> : null}
        {this.props.processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  medic: state.medic,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadMedic })(MedicProfile);
