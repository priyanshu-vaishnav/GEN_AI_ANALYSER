import axios from "axios";

// Vite ke liye custom env variable use karein (VITE_ prefix zaroori hai)
const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export async function Register({ username, email, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { username, email, password },
      { withCredentials: true },
    );
    return response.data; // Yeh line miss thi!
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Registration failed");
  }
}

export async function Login({ email, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    return response.data; // Yeh line bhi miss thi!
  } catch (err) {
    // Controller se aane waala { msg: "..." } yahan se hook tak pass hoga
    throw new Error(err.response?.data?.msg || "Login failed");
  }
}

export async function Logout() {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (err) {
    throw new Error(err.response?.data?.message || "Logout failed");
  }
}

export async function GetMe() {
  try {
    const response = await axios.get(`${API_URL}/auth/getme`, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch user details",
    );
  }
}
export async function GetUserReports() {
  try {
    const reports = await axios.get(`${API_URL}/service/myreports`, {
      withCredentials: true,
    });

    return reports.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "failed");
  }
}


