import { assets, cityList } from "@/assets/assets";
import { useState } from "react";
import SelectLoc from "./SelectLoc";
import { useAppContext } from "@/context/Appcontext";

const Hero = () => {
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();
  const [pickupLocation, setPickupLocation] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Luxury cars on rent
      </h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start">
            <SelectLoc
              placeholder="Pickup Location"
              optionData={cityList}
              func={setPickupLocation}
            />

            <p className="px-1 text-sm text-gray-500 ml-2">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500"
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="return-date">Return Date</label>
            <input
              disabled={!pickupDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={
                pickupDate
                  ? new Date(new Date(pickupDate).getTime() + 86400000) // add 1 day
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              className="text-sm text-gray-500"
              required
            />
          </div>
          <button className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary-second hover:bg-primary-dull text-white rounded-full cursor pointer">
            <img
              src={assets.search_icon}
              alt="search"
              className="brightness-300"
            />
            Search
          </button>
        </div>
      </form>
      <img src={assets.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;
