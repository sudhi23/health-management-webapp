import React, { useState } from "react";

import MenuBar from "./MenuBar/MenuBar";
import InfoBar from "./InfoBar/InfoBar";
import Title from "./Title/Title";
import Body from "./Body/Body";

import "./Dashboard.css";

function Dashboard() {
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <div className="dashboard">
      <InfoBar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className="dashboard__rowwise">
        {toggleMenu ? <MenuBar /> : null}
        <div className="dashboard__nextrows">
          <Title />
          <Body />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
