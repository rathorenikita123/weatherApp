import React, { useState } from "react";
import SearchBar from "./components/search";
import Forecast from "./components/forecast";
import { Header } from "./components/header";
import styles from "./app.module.css";
import axios from "axios";

const App = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3193ef1a3fddaea7c6a82f5bf545eba7`,
      );
      setWeatherData(response.data);
      const lat = response.data.coord.lat;
      const lon = response.data.coord.lon;
      const sunrise = response.data.sys.sunrise;
      const sunset = response.data.sys.sunset;
      setCoordinates({ lat, lon, sunrise, sunset });
      setCity("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <>
      <Header refresh={handleSearch} coordinates={coordinates} />
      <main className={styles.main}>
        <SearchBar
          weatherData={weatherData}
          setCity={setCity}
          handleSearch={handleSearch}
          city={city}
        />
        {coordinates && <Forecast coordinates={coordinates} />}
      </main>
    </>
  );
};

export default App;
