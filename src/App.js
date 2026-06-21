import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function formatDateTime(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${days[date.getDay()]}, ${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}, ${String(date.getHours()).padStart(
      2,
      "0"
    )}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  function searchCity(cityName) {
    const apiKey = "6f60fd1ebaeb36d3f6o4ab0088t35e2b";

    const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

   

    setLoading(true);
    setError("");

    axios
      .get(currentUrl)
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("City not found. Please try again.");
        setWeather(null);
        // no forecast state in this component
        setLoading(false);
      });

  }

  useEffect(() => {
    searchCity("Pretoria");
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (city.trim()) {
      searchCity(city);
    }
  }

  return (
    <main className="weather-app">
      <header>
        <h2>{formatDateTime(new Date())}</h2>
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <section className="current-weather">
  {loading ? (
    <div className="spinner"></div>
  ) : weather ? (
    <>
      <h1>{Math.round(weather.temperature.current)}°C</h1>
      <p>{weather.condition.description}</p>
      <p>{weather.city}</p>
      <p>Wind: {Math.round(weather.wind.speed)} km/h</p>

      <img
        src={`https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weather.condition.icon}.png`}
        alt={weather.condition.description}
      />
    </>
  ) : (
    <h1>--°C</h1>
  )}
</section>

      
      <footer>
        Coded by{" "}
        <a
          href="https://github.com/Nononyiko"
          target="_blank"
          rel="noreferrer"
        >
          Tinyiko
        </a>{" "}
        | Hosted on Netlify
      </footer>
    </main>
  );
}

export default App;