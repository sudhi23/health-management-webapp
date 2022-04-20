import React, { useState } from "react";
import {
  Dashboard,
  EventNote,
  Folder,
  ShowChart,
  Help,
} from "@material-ui/icons";

import "./MenuBar.css";

function MenuBar() {
  const [insideof, setInsideof] = useState("dashboard");

  return (
    <div className="menubar">
      <div
        onClick={() => setInsideof("dashboard")}
        className={`menubar__icon ${
          insideof === "dashboard" && "menubar__icon--selected"
        }`}
      >
        <Dashboard htmlColor="white" fontSize="inherit" />
      </div>
      <div
        onClick={() => setInsideof("event")}
        className={`menubar__icon ${
          insideof === "event" && "menubar__icon--selected"
        }`}
      >
        <EventNote htmlColor="white" fontSize="inherit" />
      </div>
      <div
        onClick={() => setInsideof("folder")}
        className={`menubar__icon ${
          insideof === "folder" && "menubar__icon--selected"
        }`}
      >
        <Folder htmlColor="white" fontSize="inherit" />
      </div>
      <div
        onClick={() => setInsideof("graph")}
        className={`menubar__icon ${
          insideof === "graph" && "menubar__icon--selected"
        }`}
      >
        <ShowChart htmlColor="white" fontSize="inherit" />
      </div>
      <div
        onClick={() => setInsideof("help")}
        className={`menubar__icon ${
          insideof === "help" && "menubar__icon--selected"
        }`}
      >
        <Help htmlColor="white" fontSize="inherit" />
      </div>
    </div>
  );
}

export default MenuBar;
