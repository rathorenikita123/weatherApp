import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoCloudy } from "react-icons/io5";
import { BsCloudHaze2Fill } from "react-icons/bs";
import { FaCloudRain } from "react-icons/fa";
import { FaSnowman } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const Forecast = ({ lat, lon, sunrise, sunset }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3193ef1a3fddaea7c6a82f5bf545eba7`
        );
        setForecastData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setForecastData(null);
      }
    };

    fetchForecast();
  }, [lat, lon, sunrise, sunset]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">5-Day Weather Forecast</h2>

      {forecastData && forecastData.list && (
        <div>
          {forecastData.list.map((forecast, index) => (
            <div key={index} className="mt-4 border p-4 rounded-md">
              <h3 className="text-lg font-semibold">
                {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h3>
              <p>Main: {forecast.weather[0].main}</p>
              {/* icons according to data */}
              Clouds: <IoCloudy />
              Haze: <BsCloudHaze2Fill />
              Rain: <FaCloudRain />
              snow: <FaSnowman />
              Sun: <FaSun />

              <p>
                High Temperature: {(forecast.main.temp_max - 273.15).toFixed(2)}
                °C/ {((forecast.main.temp_max * 9) / 5 - 459.67).toFixed(2)} °F
              </p>
              <p>
                Low Temperature: {(forecast.main.temp_min - 273.15).toFixed(2)}
                °C/ {((forecast.main.temp_min * 9) / 5 - 459.67).toFixed(2)} °F
              </p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()} AM</p>
              <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()} PM</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
