import { Link, useLocation } from "react-router-dom";
import DashboardEvents from "./DashboardEvents";
import DashboardArticles from "./DashboardArticles";
import DashboardAdmins from "./DashboardAdmins";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2] || "events";

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="mt-16 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-[#403905] font-bold text-2xl">Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#778970] hover:bg-red-600 text-white rounded text-sm cursor-pointer transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px] mb-10">
          Welcome to the Admin Dashboard
        </p>
        <div className="flex flex-col gap-6">
          <nav
            className={`bg-neutral-100/10 rounded shadow-sm grid grid-cols-2 ${
              user.role === "super_admin" ? "grid-cols-3" : ""
            }`}
          >
            <Link
              to="/dashboard/events"
              className={`text-center text-gray-700 rounded py-4
              hover:bg-gray-100 hover:text-gray-900 ${
                currentPath === "events" ? "bg-gray-100 text-gray-900" : ""
              }`}
            >
              Events
            </Link>
            <Link
              to="/dashboard/articles"
              className={`text-center text-gray-700 rounded py-4
              hover:bg-gray-100 hover:text-gray-900 ${
                currentPath === "articles" ? "bg-gray-100 text-gray-900" : ""
              }`}
            >
              Articles
            </Link>
            {user.role === "super_admin" && (
              <Link
                to="/dashboard/admins"
                className={`text-center text-gray-700 rounded py-4
              hover:bg-gray-100 hover:text-gray-900 ${
                currentPath === "admins" ? "bg-gray-100 text-gray-900" : ""
              }`}
              >
                Admins
              </Link>
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
