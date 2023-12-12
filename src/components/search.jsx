import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onCoordinates }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3193ef1a3fddaea7c6a82f5bf545eba7`);
      setWeatherData(response.data);

      const lat = response.data.coord.lat;
      const lon = response.data.coord.lon;
      const sunrise = response.data.sys.sunrise;
      const sunset = response.data.sys.sunset;

      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        console.log(`Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}`);
        console.log(`Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}`);
      onCoordinates(lat, lon, sunrise, sunset);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-md flex-1"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
          <p>
            Latitude: {weatherData.coord.lat > 0 ? `${weatherData.coord.lat.toFixed(4)} N` : `${Math.abs(weatherData.coord.lat).toFixed(4)} S`},{' '}
            Longitude: {weatherData.coord.lon > 0 ? `${weatherData.coord.lon.toFixed(4)} E` : `${Math.abs(weatherData.coord.lon).toFixed(4)} W`}
          </p>
          <p className="text-2xl mt-2">{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
