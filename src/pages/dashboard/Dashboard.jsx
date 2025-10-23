import { Link, useLocation } from "react-router-dom";
import DashboardEvents from "./DashboardEvents";
import DashboardArticles from "./DashboardArticles";
import DashboardAdmins from "./DashboardAdmins";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  { id: 1, label: "Events", path: "events" },
  { id: 2, label: "Articles", path: "articles" },
  { id: 3, label: "Admins", path: "admins" },
];

function Dashboard() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2] || "events";

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mt-16 pt-4 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-[#403905] font-bold text-2xl">Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#778970] hover:bg-red-600 text-white rounded text-sm cursor-pointer transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px] mb-6">
          Welcome to the Admin Dashboard
        </p>
        <div className="flex flex-col gap-6">
          <nav
            className={`rounded grid grid-cols-2 gap-4 ${
              user?.role === "super_admin" && "grid-cols-3"
            }`}
          >
            {navItems.map((item) =>
              user?.role !== "super_admin" && item.path === "admins" ? null : (
                <Link
                  key={item.id}
                  to={`/dashboard/${item.path}`}
                  className={`text-center text-gray-700 rounded py-2 sm:py-4
                hover:bg-gray-100 hover:text-gray-900 shadow-sm ${
                  currentPath === item.path && "bg-gray-100 text-dark font-bold"
                }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          {currentPath === "events" ? (
            <DashboardEvents />
          ) : currentPath === "articles" ? (
            <DashboardArticles />
          ) : (
            <DashboardAdmins />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
