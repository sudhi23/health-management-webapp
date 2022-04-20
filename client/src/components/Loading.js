import React, { Component } from "react";
import logo from "../assets/Ashoka_Chakra.svg";
import image from "../assets/vande.png";

class Loading extends Component {
  render() {
    return (
      <div className="overlay bg-tricolor">
        <div className="loading">
          <div className="container-md text-center">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="container-md text-center">
            <img src={image} alt="VandeMataram" className="image" />
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
