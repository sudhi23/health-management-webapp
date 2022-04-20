import React, { Component } from "react";

class SpinLoading extends Component {
  render() {
    return (
      <div className="overlay blur">
        <div className="loader loader_s" />
        <div className="overlay">
          <div className="loader loader_w" />
        </div>
        <div className="overlay">
          <div className="loader loader_g" />
        </div>
      </div>
    );
  }
}

export default SpinLoading;
