import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Helper functions for specific endpoints
export const getAssignments = () => API.get("/assignments");

export const getAgents = () => API.get("/agents");

export const createAgent = (agentData) => API.post("/agents", agentData);

export default API;
