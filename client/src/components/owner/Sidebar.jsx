import { assets, dummyUserData, ownerMenuLinks } from "@/assets/assets";
import { useAppContext } from "@/context/Appcontext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateImage = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
        setImage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=100&auto=format&fit=crop"
            }
            alt="profile pic"
            className="w-10 h-10 md:w-16 md:h-16 lg:h-20 lg:w-20 rounded-full mx-auto object-cover shadow-md ring-2 ring-primary-second"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-0 right-0 flex items-center p-2 gap-1 bg-primary-second/10 text-primary-second cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <>
              Saving
              <LoaderCircle
                className="w-5 h-5 animate-spin text-primary-second"
                strokeWidth={3}
              />
            </>
          ) : (
            <>
              Save
              <img src={assets.check_icon} width={13} alt="check icon" />
            </>
          )}
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary-second/10 text-primary-second"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="car icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "bg-primary-second"
              } w-1.5 h-8 rounded-lg right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
