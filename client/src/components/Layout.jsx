import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Home</Link>
          <Link to="/agents" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Agents</Link>
          <Link to="/upload" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Upload</Link>
        </nav>
        <div className="mt-auto p-4">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
