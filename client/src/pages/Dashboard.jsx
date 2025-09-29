import { Link } from "react-router-dom";
import { Users, Upload, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const items = [
    { title: "Agents", desc: "Manage your agents here.", icon: <Users />, link: "/agents" },
    { title: "Upload", desc: "Upload CSV/XLSX files for distribution.", icon: <Upload />, link: "/upload" },
    { title: "Reports", desc: "View reports and analytics.", icon: <BarChart3 />, link: "/reports" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Dashboard</h2>
      <p className="text-gray-600 mb-6">Use the tools below to manage your system.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-200 flex flex-col items-start"
          >
            <div className="text-gray-700 mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
