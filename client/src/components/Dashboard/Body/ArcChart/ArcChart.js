import React, { useRef, useEffect } from "react";

import "./ArcChart.css";

function ArcChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "#2c426b";

    ctx.beginPath();
    ctx.arc(90, 90, 80, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(90, 90, 60, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.arc(90, 90, 80, -Math.PI / 3, 2 * Math.PI * 0.7 - Math.PI / 3);
    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(90, 90, 60, -Math.PI / 2, 2 * Math.PI * 0.3 - Math.PI / 2);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }, [canvasRef]);

  return <canvas className="canvas" height={180} width={180} ref={canvasRef} />;
}

export default ArcChart;
