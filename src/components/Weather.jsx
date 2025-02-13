import search from "../assets/search.png";
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
    </div>
  );
};

export default Weather;
