import { useState, useEffect } from "react";
import API from "../api/axios";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await API.get("/agents");
      setAgents(data);
    } catch (err) {
      console.error("Failed to load agents");
    }
  };

  useEffect(() => { load(); }, []);

  const validatePhone = (phone) => {
    const phoneRegex = /^\+\d{1,3}[\s\-]?\d{1,15}$/;
    return phoneRegex.test(phone);
  };

  const add = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!validatePhone(mobile)) {
      setError("Phone must include country code, e.g., +1 1234567890");
      return;
    }
    try {
      await API.post("/agents", { name, email, mobile, password });
      setName(""); setEmail(""); setMobile(""); setPassword("");
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add agent");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Agents</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Agent</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="Mobile with country code, e.g., +1 1234567890"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            pattern="^\+\d{1,3}[\s\-]?\d{1,15}$"
            title="Phone must include country code, e.g., +1 1234567890"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="md:col-span-2">
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Agent
          </button>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Agent List</h3>
        <ul className="space-y-2">
          {agents.map(a => (
            <li key={a._id} className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-800">{a.name}</div>
              <div className="text-gray-600">{a.email} - {a.phone}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
