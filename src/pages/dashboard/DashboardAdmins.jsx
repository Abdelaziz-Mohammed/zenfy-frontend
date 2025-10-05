import { useContext } from "react";
import Loading from "../../components/loading/Loading";
import { AdminsContext } from "../../context/AdminsContext";
import { AuthContext } from "../../context/AuthContext";

function DashboardAdmins() {
  const {
    admins,
    loading,
    deleteAdmin,
    approveRequest,
    rejectRequest,
    pendingAdmins,
  } = useContext(AdminsContext);

  const { user, logout } = useContext(AuthContext);

  return (
    <div className="border border-neutral-200 px-4 py-6 rounded-xl">
      <div className="flex justify-between items-center mb-8 border-b border-neutral-200 pb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-wide capitalize">
            Welcome, <br /> {user?.name || "Admin"}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-[#778970] hover:bg-red-600 text-white rounded text-sm cursor-pointer transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
      {/* Pending requests */}
      <div className="mb-8">
        <h3 className="text-base font-bold mb-3">Pending Requests</h3>
        {pendingAdmins.length === 0 ? (
          <p className="text-sm text-gray-500">No pending requests</p>
        ) : (
          <ul className="flex flex-col gap-3 mt-3">
            {pendingAdmins.map((admin) => (
              <li
                key={admin._id}
                className="border border-neutral-300 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium">{admin.name}</h4>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => approveRequest(admin._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectRequest(admin._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3 className="text-base font-bold mb-3">All Admins</h3>
      {/* admins list */}
      <ul className="flex flex-col gap-4">
        {loading ? (
          <Loading fullscreen={false} />
        ) : (
          admins.map((admin) => (
            <li
              key={admin._id}
              className="border border-neutral-300 p-3 rounded flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 overflow-hidden">
                  <h4 className="text-base font-medium">{admin.name}</h4>
                  <p className="text-sm text-neutral-500 font-medium text-nowrap overflow-hidden text-ellipsis">
                    {admin.email}
                  </p>
                  <p className="text-sm text-neutral-600 font-medium">
                    <b className="font-bold">Role: </b> {admin.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteAdmin(admin._id)}
                className="outline-0 border-0 h-8 w-full max-w-[200px] ml-auto text-white bg-[#778970] hover:bg-red-600
                cursor-pointer rounded-sm text-sm sm:text-base transition-all duration-300 ease-in-out"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default DashboardAdmins;
