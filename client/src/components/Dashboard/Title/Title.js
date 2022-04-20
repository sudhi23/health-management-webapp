import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloudOutlined } from "@material-ui/icons";

import "./Title.css";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "f33a484cf794d08d0148764789aaba32";

function Title() {
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const date = new Date();
    setDate(date.toDateString());
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentWeather, showError);
      }
    };

    const currentWeather = async (position) => {
      const { latitude, longitude } = position.coords;
      const { data } = await axios.get(URL, {
        params: {
          lat: latitude,
          lon: longitude,
          units: "metric",
          APPID: API_KEY,
        },
      });
      setWeather(data);
    };

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        default:
          console.log("An unknown error occurred.");
          break;
      }
    }

    getLocation();
  }, []);

  return (
    <div className="title">
      <span className="title__left">Dashboard</span>
      <div className="title__right">
        <span>{date}</span>
        {weather?.main ? (
          <div className="title__weather">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="title__weatherIcon"
            />
            <div className="title__weatherInfo">
              <span>{Math.round(weather.main.temp)} &deg;C</span>
              <span>
                {weather.name}, {weather.sys.country}
              </span>
            </div>
          </div>
        ) : (
          <div className="title__weather">
            <CloudOutlined />
            <span>N.A.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Title;
