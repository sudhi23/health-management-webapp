import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, Alert } from "reactstrap";

import { clearSuccess } from "../actions/requestActions";

class SuccessModal extends Component {
  state = {
    modal: false,
    msg: null,
  };

  static propTypes = {
    request: PropTypes.object.isRequired,
    clearSuccess: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const request = this.props.request;
    if (request !== prevProps.request) {
      const { msg } = request;
      if (msg) {
        this.setState({
          modal: true,
          msg,
        });
      }
    }
  }

  toggle = () => {
    // Clear success
    this.props.clearSuccess();
    this.setState({
      modal: !this.state.modal,
      msg: null,
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Woohhooo...!!!</ModalHeader>
          <ModalBody>
            <Alert color="success">{this.state.msg}</Alert>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, { clearSuccess })(SuccessModal);
