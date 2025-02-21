import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
      setError(null);
      try {
          const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
          const data = await response.json();
          if (response.ok) {
              setWeather(data);
          } else {
              setError(data.error);
              setWeather(null);
          }
      } catch (err) {
          setError("Failed to fetch weather data");
      }
  };

    return (
        <div className="weather-container">
            <h1>Weather Dashboard</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field"
            />
            <button onClick={fetchWeather} className="fetch-button">Get Weather</button>

            {error && <p className="error-message">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.city}</h2>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Description: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;