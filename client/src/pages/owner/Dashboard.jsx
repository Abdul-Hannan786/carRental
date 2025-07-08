import { assets, dummyDashboardData } from "@/assets/assets";
import Title from "@/components/owner/Title";
import { useAppContext } from "@/context/Appcontext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title={"Admin Dashboard"}
        subTitle={
          "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        }
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between p-4 rounded-md shadow-lg"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-second/10">
              <img
                src={card.icon}
                alt={`${card.title} icon`}
                className="h-4 w-4"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 rounded-md max-w-lg w-full shadow-lg">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>
          {data.recentBookings.map((booking, index) => (
            <div key={index} className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-second/10">
                  <img
                    src={assets.listIconColored}
                    className="w-5 h-5"
                    alt=""
                  />
                </div>
                <div>
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-500">${booking.price}</p>
                <p
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-400/15 text-green-600"
                      : "bg-yellow-400/15 text-yellow-600"
                  }`}
                >
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 md:p-6 mb-6 rounded-md w-full md:max-w-xs shadow-lg">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary-second">
            ${data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
