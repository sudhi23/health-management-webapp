import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, Alert } from "reactstrap";

import { clearErrors } from "../actions/errorActions";

class AlertModal extends Component {
  state = {
    modal: false,
    msg: null,
  };

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    if (error !== prevProps.error) {
      const { isError, msg } = error;
      if (isError) {
        this.setState({
          modal: true,
          msg,
        });
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
      msg: null,
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Whooops...!!!</ModalHeader>
          <ModalBody>
            <Alert color="danger">{this.state.msg}</Alert>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { clearErrors })(AlertModal);
