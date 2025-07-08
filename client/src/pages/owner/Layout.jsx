import NavbarOwner from "@/components/owner/NavbarOwner";
import Sidebar from "@/components/owner/Sidebar";
import { useAppContext } from "@/context/Appcontext";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const { user } = useAppContext();

  useEffect(() => {
    if (!user || user.role !== "owner") {
       <Navigate to="/" />;
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
