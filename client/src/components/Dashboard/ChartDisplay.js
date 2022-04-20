import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

class ChartDisplay extends Component {
  static propTypes = {
    test: PropTypes.object.isRequired,
  };

  render() {
    const { readings } = this.props.test;
    console.log(readings);
    return (
      <Line
        data={{
          datasets: [
            {
              label: "Temperature",
              data: readings.map(({ temperature }) => temperature),
              borderColor: "rgba(255, 99, 132, 0.6)",
              fill: false,
            },
            {
              label: "Pulse",
              data: readings.map(({ pulse }) => pulse),
              borderColor: "rgba(54, 162, 235, 0.6)",
              fill: false,
            },
            {
              label: "SpO2",
              data: readings.map(({ spo2 }) => spo2),
              borderColor: "rgba(255, 206, 86, 0.6)",
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          legend: {
            position: "right",
          },
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
              },
            ],
          },
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps, {})(ChartDisplay);
