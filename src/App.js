import React, { useState } from 'react';
import SearchBar from './components/search';
import Forecast from './components/forecast';

const App = () => {
  const [coordinates, setCoordinates] = useState(null);

  const handleCoordinates = (lat, lon, sunrise, sunset) => {
    setCoordinates({ lat, lon, sunrise, sunset });
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <SearchBar onCoordinates={handleCoordinates} />
      {coordinates && <Forecast lat={coordinates.lat} lon={coordinates.lon} sunrise={coordinates.sunrise} sunset={coordinates.sunset}/>}
    </div>
  );
};

export default App;
