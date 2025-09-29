import { useState, useEffect } from "react";
import API, { getAssignments, getAgents, createAgent } from "../api/axios";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", phone: "", password: "" });
  const [agentError, setAgentError] = useState("");
  const [addingAgent, setAddingAgent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!file || agents?.length !== 5) return;
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

  const loadAgents = async () => {
    try {
      const { data } = await getAgents();
      setAgents(data);
    } catch (err) {
      console.error("Failed to load agents");
      setAgents([]);
    }
  };

  const addAgent = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = newAgent;
    if (!name || !email || !phone || !password) {
      setAgentError("All fields are required");
      return;
    }
    if (!phone.startsWith("+")) {
      setAgentError("Phone must include country code, e.g., +1 123-456-7890");
      return;
    }
    if (password.length < 6) {
      setAgentError("Password must be at least 6 characters");
      return;
    }
    setAddingAgent(true);
    setAgentError("");
    try {
      await createAgent(newAgent);
      setNewAgent({ name: "", email: "", phone: "", password: "" });
      await loadAgents(); // Refresh agents list
    } catch (err) {
      setAgentError(err.response?.data?.message || "Failed to add agent");
    } finally {
      setAddingAgent(false);
    }
  };

  const loadAssignments = async () => {
    try {
      const { data } = await getAssignments();
      setAssignments(data);
    } catch (err) {
      console.error("Failed to load assignments");
      setAssignments([]);
    }
  };

  useEffect(() => {
    loadAgents();
    loadAssignments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload CSV/XLSX</h2>
      {agents?.length < 5 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-lg">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">Add Agents ({agents?.length || 0}/5)</h3>
          <p className="text-yellow-700 mb-4">Exactly 5 agents are required for distribution. Add them below.</p>
          <form onSubmit={addAgent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone (e.g., +1 123-456-7890)"
                value={newAgent.phone}
                onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={newAgent.password}
                onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {agentError && <p className="text-red-500">{agentError}</p>}
            <button
              type="submit"
              disabled={addingAgent}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 disabled:opacity-50"
            >
              {addingAgent ? "Adding..." : "Add Agent"}
            </button>
          </form>
        </div>
      )}
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
          {agents?.length !== 5 && (
            <p className="text-red-500">Please add exactly 5 agents before uploading.</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={!file || uploading || agents?.length !== 5}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Distributed Lists</h3>
        {assignments?.length === 0 ? (
          <p className="text-gray-600">No assignments yet.</p>
        ) : (
          assignments.map(ass => (
            <div key={ass._id} className="mb-4 border-b pb-4">
              <h4 className="font-medium text-gray-800">{ass.agentId.name} ({ass.agentId.email}) - {ass.agentId.phone}</h4>
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
