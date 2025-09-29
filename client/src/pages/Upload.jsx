import { useState, useEffect } from "react";
import API, { getAssignments } from "../api/axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const { data } = await API.post("/upload", form);
      alert(data.message || "Uploaded and distributed!");
      setFile(null);
      loadAssignments(); // Refresh assignments after upload
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const loadAssignments = async () => {
    try {
      const { data } = await getAssignments();
      setAssignments(data);
    } catch (err) {
      console.error("Failed to load assignments");
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload CSV/XLSX</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Select File (CSV, XLSX, XLS)</label>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={e => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Distributed Lists</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-600">No assignments yet.</p>
        ) : (
          assignments.map(ass => (
            <div key={ass._id} className="mb-4 border-b pb-4">
              <h4 className="font-medium text-gray-800">{ass.agentId.name} ({ass.agentId.email})</h4>
              <ul className="mt-2 space-y-1">
                {ass.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    {item.FirstName} - {item.Phone} - {item.Notes}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
