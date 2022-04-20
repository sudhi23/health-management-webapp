import React, { useState, useEffect } from "react";

import "./DateTime.css";

function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  });

  return (
    <div className="datetime">
      <h6>{date.toTimeString().split(" ")[0]}</h6>
      <span>{date.toDateString()}</span>
    </div>
  );
}

export default DateTime;
