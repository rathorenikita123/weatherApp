import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { getWeatherIcon } from "../../utils/icons";
import { kelvinToCelsius, kelvinToFahrenheit } from "../../utils/conversions";

const Forecast = ({ coordinates: { lat, lon, sunrise, sunset } }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3193ef1a3fddaea7c6a82f5bf545eba7`
        );
        const data = response.data.list;
        const finalData = {};
        data.forEach((d) => {
          const date = d.dt_txt.split(" ")[0];
          if (!finalData[date]) {
            finalData[date] = d;
            finalData[date].count = 0;
            finalData[date].main.humidity = 0;
          }
          finalData[date].main.temp_max = Math.max(
            d.main.temp_max,
            finalData[date].main.temp_max
          );
          finalData[date].main.temp_min = Math.min(
            d.main.temp_min,
            finalData[date].main.temp_min
          );
          finalData[date].main.humidity += d.main.humidity;
          finalData[date].count += 1;
        });
        console.log(finalData, "finalData");
        const weatherData = Object.keys(finalData).map((k) => finalData[k]);
        setForecastData(weatherData);
        console.log(weatherData, "weatherData");
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setForecastData(null);
      }
    };

    fetchForecast();
  }, [lat, lon, sunrise, sunset]);

  if (!forecastData) {
    return (
      <div className={styles.container}>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.labels}>
        <p>High Temperature</p>
        <p>Low Temperature</p>
        <p>Humidity</p>
        <p>Sunrise Time</p>
        <p>Sunset Time</p>
      </div>
      {forecastData &&
        forecastData.map((forecast, index) => (
          <div key={index} className={styles.card}>
            <h3>
              {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h3>
            <div className={styles.info}>
              <div className={styles.icon}>
                <img
                  src={`https://openweathermap.org/img/wn/${getWeatherIcon(
                    forecast.weather[0].id
                  )}@2x.png`}
                  alt="weather icon"
                />
                {forecast.weather[0].main}
              </div>
              <p>
                {kelvinToCelsius(forecast.main.temp_max)}°C /{" "}
                {kelvinToFahrenheit(forecast.main.temp_max)}°F
              </p>
              <p>
                {kelvinToCelsius(forecast.main.temp_min)}°C /{" "}
                {kelvinToFahrenheit(forecast.main.temp_min)}°F
              </p>
              <p>{(forecast.main.humidity / forecast.count).toFixed(2)}%</p>
              <p>{new Date(sunrise * 1000).toLocaleTimeString()} AM</p>
              <p>{new Date(sunset * 1000).toLocaleTimeString()} PM</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Forecast;
