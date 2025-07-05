import { assets } from "@/assets/assets";
import Title from "@/components/owner/Title";
import { useState } from "react";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title={"Add New Car"}
        subTitle={
          "Fill in details to list a new car for booking, including pricing, availability, and car specifications."
        }
      />
      <form
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
        onSubmit={onSubmitHandler}
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="h-14 rounded cursor-pointer"
              alt="upload car image"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="block mb-2 text-sm font-medium text-gray-700">
            Upload a picture of your car
          </p>
        </div>

        {/* Car Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="brand"
            >
              Brand
            </label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              id="brand"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="model"
            >
              Model
            </label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              id="model"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Car Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="year"
            >
              Year
            </label>
            <input
              type="number"
              placeholder="2025"
              required
              id="year"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="price-per-day"
            >
              Daily Price ($)
            </label>
            <input
              type="number"
              placeholder="100"
              required
              id="price-per-day"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="category"
            >
              Category
            </label>
            <select
              required
              id="category"
              className="w-full border border-gray-300  rounded-lg p-2.5 text-gray-800  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="SVanUV">Van</option>
            </select>
          </div>
        </div>

        {/* Car Transmisson, fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="transmission"
            >
              Transmission
            </label>
            <select
              id="transmission"
              className="w-full border border-gray-300  rounded-lg p-2.5 text-gray-800  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              required
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="fuel-type"
            >
              Fuel Type
            </label>
            <select
              id="fuel-type"
              className="w-full border border-gray-300  rounded-lg p-2.5 text-gray-800  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              required
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="seating-capacity"
            >
              Seating Capacity
            </label>
            <input
              type="number"
              placeholder="4"
              required
              id="seating-capacity"
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Car Location */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <select
              id="location"
              className="w-full border border-gray-300  rounded-lg p-2.5 text-gray-800  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setCar({ ...car, location: e.target.value })}
              value={car.location}
              required
            >
              <option value="">Select a location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Houston">Houston</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
        </div>

        {/* Car Description */}
        <div className="flex flex-col w-full">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            required
            id="description"
            className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary-second text-white rounded-md font-medium w-full justify-center cursor-pointer">
          <img src={assets.tick_icon} alt="check icon" />
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
