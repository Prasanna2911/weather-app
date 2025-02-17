import Search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import "../components/Weather.css";
import { useEffect, useState, useRef } from "react";

const Weather = () => {
  const getWeatherImage = (description) => {
    if (!description) return clear;
    // console.log(description, "my image");
    const lowerCaseDescription = description.toLowerCase();
    if (lowerCaseDescription.includes("clear")) return clear;
    if (lowerCaseDescription.includes("cloud")) return cloud;
    if (lowerCaseDescription.includes("drizzle")) return drizle;
    if (lowerCaseDescription.includes("rain")) return rain;
    if (lowerCaseDescription.includes("snow")) return snow;
    if (lowerCaseDescription.includes("wind")) return wind;

    return clear;
  };
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const search = async (city) => {
    if (city === "") {
      alert("Please Enter a City name");
      return;
    }
    console.log(`Searching for city: ${city}`);
    try {
      const apiKey = "dbdecc1badd28a7220ac4fe598b06100";
      const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
      const response = await fetch(url);
      // console.log(response);
      const data = await response.json();
      console.log(data);
      if (!response.ok || !data.location) {
        setWeatherData(null);
        alert("City not Found. Please Enter a Valid City Name");
        return;
      }

      // console.log(data);
      console.log(data.current);
      setWeatherData({
        temperature: data.current.temperature,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        location: data.location.name,
        weatherIcon: getWeatherImage(
          data.current.weather_descriptions ? [0] : ""
        ),
      });

      // console.log(weatherData, "weatherData");
    } catch (err) {
      console.error("Failed");
      setWeatherData(false);
    }
  };
  JSON.stringify(weatherData);
  // console.log(JSON.stringify(weatherData));
  useEffect(() => {
    search("");
  }, []);
  // for optimization
  // if (!weatherData) return <div>Loading...</div>;

  return (
    <div className="weather place-self-center p-[40px] rounded-[10px] bg-linear-45 from-[#2f4680] to-[#500ae4] flex flex-col items-center">
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
          autoSave=""
        />
      </div>
      {weatherData ? (
        <>
          {weatherData.weatherIcon && (
            <img
              src={weatherData.weatherIcon}
              alt="Weather-Images"
              className="w-[150px] mx-0 my-[10px]"
            />
          )}
          {/* <img src={} alt="" className="w-[150px] mx-0 my-[10px]" /> */}

          <p className="text-white text-[80px] leading-none">
            {weatherData.temperature}
          </p>
          <p className="location text-[40px] text-white">
            {weatherData.location}
          </p>
          {/* Weathear Data */}
          <div className="weather-data flex  justify-between mt-8">
            <div className="col ">
              <img src={humidity} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="Wind-Speed" />
              <div>
                <p> {weatherData.windSpeed}km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
