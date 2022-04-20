import React from "react";
import {
  Search,
  Notifications,
  Mail,
  KeyboardArrowDown,
  Menu,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

import "./InfoBar.css";

function InfoBar({ toggleMenu, setToggleMenu }) {
  return (
    <div className="infobar">
      <div className="infobar__left">
        <IconButton
          onClick={() => {
            setToggleMenu(!toggleMenu);
          }}
        >
          <Menu />
        </IconButton>
      </div>
      <div className="infobar__right">
        <IconButton>
          <Search />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <Mail />
        </IconButton>
        <Avatar />
        <span>Sudhanshu Kumar</span>
        <IconButton>
          <KeyboardArrowDown />
        </IconButton>
      </div>
    </div>
  );
}

export default InfoBar;
