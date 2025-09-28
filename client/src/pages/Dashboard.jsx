export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Dashboard</h2>
      <p className="text-gray-600 mb-4">Use the sidebar links to manage Agents or Upload tasks.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Agents</h3>
          <p className="text-gray-600">Manage your agents here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload</h3>
          <p className="text-gray-600">Upload CSV/XLSX files for distribution.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Reports</h3>
          <p className="text-gray-600">View reports and analytics.</p>
        </div>
      </div>
    </div>
  );
}
