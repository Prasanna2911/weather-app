import React, { useEffect, useState, useRef } from "react";
import Search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";
import "../components/Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  // Function to get appropriate weather image
  const getWeatherImage = (weatherCode) => {
    if (weatherCode === 0) return clear; // Clear Sky
    if (weatherCode === 2) return cloud; // Partly Cloudy
    if (weatherCode === 3) return cloud; // Cloudy
    if (weatherCode >= 51) return rain; // Rain
    if (weatherCode >= 71) return snow; // Snow
    return drizzle; // Default
  };

  // Function to fetch weather data
  const search = async (city) => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      // Get latitude & longitude for city
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeatherData(null);
        alert("City not found. Please enter a valid city name.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Fetch weather data using latitude & longitude
      // const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&humidity_2m=true`;

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m`;
      // https://api.open-meteo.com/v1/forecast?latitude=40.71427&longitude=-74.00597&current_weather=true&hourly=relative_humidity_2m

      const weatherResponse = await fetch(weatherUrl);
      const weatherDataJson = await weatherResponse.json();
      console.dir(weatherDataJson, "weather data");

      if (!weatherResponse.ok || !weatherDataJson.current_weather) {
        setWeatherData(null);
        alert("Weather data not found for this city.");
        setLoading(false);
        return;
      }
      const humidityIndex = weatherDataJson.hourly?.time?.findIndex(
        (time) => time === weatherDataJson.current_weather.time
      );
      const Humidity =
        humidityIndex !== -1
          ? weatherDataJson.hourly.relative_humidity_2m[humidityIndex]
          : "N/A";
      // Update state with weather data
      setWeatherData({
        temperature: weatherDataJson.current_weather.temperature,
        windSpeed: weatherDataJson.current_weather.windspeed,
        humidity: Humidity,
        location: name,
        weatherIcon: getWeatherImage(
          weatherDataJson.current_weather.weathercode
        ),
      });
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
      setWeatherData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    search("New York"); // Default city on load
  }, []);

  return (
    <div className="weather place-self-center p-[40px] rounded-[10px] bg-gradient-to-r from-[#2f4680] to-[#500ae4] flex flex-col items-center">
      <div className="search-bar flex items-center gap-[12px]">
        <input
          type="text"
          placeholder="Enter City Name"
          className="pl-4 h-[50px] border-none outline-none rounded-[40px] text-[#626262] text-[18px] bg-[#ebfffc]"
          ref={inputRef}
        />
        <img
          src={Search}
          alt="Search-Icon"
          className="w-[50px] cursor-pointer p-[16px] rounded-[50%] bg-[#ebfffc]"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {loading && <p className="text-white mt-4">Loading...</p>}

      {weatherData && (
        <>
          {weatherData.weatherIcon && (
            <img
              src={weatherData.weatherIcon}
              alt="Weather-Icon"
              className="w-[150px] mx-0 my-[10px]"
            />
          )}
          <p className="text-white text-[80px] leading-none">
            {weatherData.temperature}°C
          </p>
          <p className="location text-[40px] text-white">
            {weatherData.location}
          </p>

          {/* Weather Data */}
          <div className="weather-data flex justify-between mt-8">
            <div className="col flex items-center gap-2">
              <img src={humidityIcon} alt="Humidity" className="w-[40px]" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col flex items-center gap-2">
              <img src={wind} alt="Wind-Speed" className="w-[40px]" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
