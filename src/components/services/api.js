import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------
// GET: /users
// --------------------
export const getUsers = async (page = 1, count = 6) => {
  const response = await api.get(`/users`, {
    params: { page, count },
  });
  return response.data;
};

// --------------------
// GET: /positions
// --------------------
export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};

// --------------------
// GET: /token (Required before POST)
// --------------------
export const getToken = async () => {
  const response = await api.get("/token");
  return response.data.token;
};

// --------------------
// POST: /users (Register new user)
// Requires a special token in headers
// --------------------
export const registerUser = async (formData, token) => {
  const response = await api.post("/users", formData, {
    headers: {
      Token: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
