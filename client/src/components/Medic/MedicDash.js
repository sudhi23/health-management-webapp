import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadMedic } from "../../actions/medicActions";

import Prescript from "./Prescript";
import SpinLoading from "../Loaders/SpinLoading";

class MedicDash extends Component {
  componentDidMount() {
    this.props.loadMedic();
  }

  render() {
    const { medicAuthenticated } = this.props.medic;
    const processing = this.props.processing;
    return (
      <div className="bg-light p-2">
        {medicAuthenticated ? <Prescript /> : null}
        {processing ? <SpinLoading /> : null}
      </div>
    );
  }
}

MedicDash.propTypes = {
  medic: PropTypes.object.isRequired,
  loadMedic: PropTypes.func.isRequired,
  processing: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  medic: state.medic,
  processing: state.request.processing,
});

export default connect(mapStateToProps, { loadMedic })(MedicDash);
