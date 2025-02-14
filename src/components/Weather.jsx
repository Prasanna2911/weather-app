import search from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import "../components/Weather.css";

const Weather = () => {
  return (
    <div className="weather place-self-center p-[40px] rounded-[10px] bg-linear-45 from-[#2f4680] to-[#500ae4] flex flex-col items-center">
      <div className="search-bar flex items-center gap-[12px]">
        <input
          type="text"
          placeholder="Enter City Name"
          className="pl-4 h-[50px] border-none outline-none rounded-[40px] text-[#626262] text-[18px] bg-[#ebfffc]"
        />
        <img
          src={search}
          alt="Search-Icon"
          className="w-[50px] cursor-pointer p-[16px] rounded-[50%] bg-[#ebfffc]"
        />
      </div>
      <img src={clear} alt="" className="w-[150px] mx-0 my-[10px]" />
      <p className="text-white text-[80px] leading-none">16°c</p>
      <p className="location text-[40px] text-white">London</p>
      {/* Weathear Data */}
      <div className="weather-data flex  justify-between mt-8">
        <div className="col ">
          <img src={humidity} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" />
          <div>
            <p>3.6 km</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
