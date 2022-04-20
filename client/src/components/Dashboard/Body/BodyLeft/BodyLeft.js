import React from "react";

import "./BodyLeft.css";
import { People } from "@material-ui/icons";

function BodyLeft() {
  return (
    <div className="bodyleft">
      <div className="bodyleft__top">
        <div className="bodyleft__topleft">
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
        </div>
        <div className="bodyleft__topright">
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
          <div className="bodyleft__content">
            <h6>Header</h6>
            <span>Content</span>
          </div>
        </div>
      </div>
      <div className="bodyleft__bottom">
        <div className="bodyleft__bottomtop">
          <h6>Header</h6>
          <span>Content</span>
        </div>
        <div className="bodyleft__bottombottom">
          <div className="bodyleft__memberInfo">
            <h3>Members</h3>
            <div className="body__icon">
              <People fontSize="inherit" htmlColor="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyLeft;
