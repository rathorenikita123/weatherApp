import React from "react";
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";
import { MdShareLocation } from "react-icons/md";

const SearchBar = ({ weatherData, setCity, handleSearch, city }) => (
  <div className={styles.container}>
    {weatherData && (
      <div className={styles.cityContainer}>
        <h2 className={styles.cityName}>
          <MdShareLocation />
          {weatherData.name}, {weatherData.sys.country}
        </h2>
        <p className={styles.coord}>
          {weatherData.coord.lat > 0
            ? `${weatherData.coord.lat.toFixed(4)} N`
            : `${Math.abs(weatherData.coord.lat).toFixed(4)} S`}{" "}
          &{" "}
          {weatherData.coord.lon > 0
            ? `${weatherData.coord.lon.toFixed(4)} E`
            : `${Math.abs(weatherData.coord.lon).toFixed(4)} W`}
        </p>
      </div>
    )}
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search your city here..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.textbox}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      <button onClick={handleSearch} className={styles.button}>
        <FaSearch />
      </button>
    </div>
  </div>
);

export default SearchBar;
