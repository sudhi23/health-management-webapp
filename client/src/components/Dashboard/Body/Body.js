import React, { useState } from "react";
import { MultilineChart, Event, Assignment } from "@material-ui/icons";
import Calendar from "react-calendar";

import ChartDisplay from "../ChartDisplay";
import DateTime from "./DateTime/DateTime";
import ArcChart from "./ArcChart/ArcChart";
import BodyLeft from "./BodyLeft/BodyLeft";

import "./Body.css";

function Body() {
  const [date, dateChange] = useState(new Date());

  return (
    <div className="body">
      <BodyLeft />
      <div className="body__right">
        <div className="body__chart">
          <div className="body__chartInfo">
            <h3>Readings</h3>
            <div className="body__icon">
              <MultilineChart fontSize="inherit" htmlColor="white" />
            </div>
          </div>
          <div className="body__chartContent">
            <ChartDisplay />
          </div>
        </div>
        <div className="body__rightBottom">
          <div className="body__tasks">
            <div className="body__tasksInfo">
              <h3>Cases</h3>
              <div className="body__icon">
                <Assignment fontSize="inherit" htmlColor="white" />
              </div>
            </div>
            <div className="body__tasksArc">
              <ArcChart />
            </div>
            <div className="body__tasksDetail">
              <h6>Confirmed</h6>
              <span>100</span>
            </div>
            <div className="body__tasksDetail">
              <h6>Recovered</h6>
              <span>100</span>
            </div>
            <div className="body__tasksDetail">
              <h6>Death</h6>
              <span>100</span>
            </div>
          </div>
          <div className="body__calendar">
            <div className="body__calendarInfo">
              <DateTime />
              <div className="body__icon">
                <Event fontSize="inherit" htmlColor="white" />
              </div>
            </div>
            <div className="body__calendarContent">
              <Calendar value={date} onChange={dateChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
