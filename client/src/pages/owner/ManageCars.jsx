import { assets } from "@/assets/assets";
import Title from "@/components/owner/Title";
import { useAppContext } from "@/context/Appcontext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ConfirmModal";

const ManageCars = () => {
  const { isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOwnerCar = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCar();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = (carId) => {
    setSelectedCarId(carId);
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCarId) return;
    setLoading(true);
    await deleteCar(selectedCarId);
    setLoading(false);
    setOpenModal(false);
  };

  const deleteCar = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCar();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCar();
  }, [isOwner]);

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title={"Manage Cars"}
        subTitle={
          "View all listed cars, update their details, or remove them from the booking platform."
        }
      />
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt="car"
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} • {car.transmission}
                    </p>
                  </div>
                </td>
                <td className="p-3 max-md:hidden">{car.category}</td>
                <td className="p-3">${car.pricePerDay}/day</td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="flex items-center p-3">
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    className="cursor-pointer"
                    src={
                      car.isAvailable ? assets.eye_close_icon : assets.eye_icon
                    }
                    alt="eye icon"
                  />
                  <img
                    onClick={() => handleDeleteClick(car._id)}
                    className="cursor-pointer"
                    src={assets.delete_icon}
                    alt="delete icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={openModal}
        onCancel={handleCancel}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this car?"
        loading={loading}
      />
    </div>
  );
};

export default ManageCars;
