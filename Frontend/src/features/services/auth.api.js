import axios from "axios";

// Vite ke liye custom env variable use karein (VITE_ prefix zaroori hai)
const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";


export async function Register({ username, email, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      { username, email, password },
      { withCredentials: true }
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
      { withCredentials: true }
    );
    return response.data; // Yeh line bhi miss thi!
  } catch (err) {
    // Controller se aane waala { msg: "..." } yahan se hook tak pass hoga
    throw new Error(err.response?.data?.msg || "Login failed");
  }
}

export async function Logout(){
  try{
    await axios.post(`${API_URL}/auth/logout`,{}, {withCredentials:true})

  }

  catch(err){
    throw new Error(err.response?.data?.message || "Logout failed")
  }
}

export async function GetMe() {
  try {
    // 1. LocalStorage se token nikalein
    const token = localStorage.getItem("token");

    // 2. Agar token nahi mila, toh request bhejni hi nahi hai (yahin se error throw kar do)
    if (!token) {
      throw new Error("No token found in localStorage");
    }

    // 3. Request ke sath headers me Bearer token bhejein
    const response = await axios.get(`${API_URL}/auth/getme`, {
      headers: {
        Authorization: `Bearer ${token}` // <--- Yeh token backend ke naye middleware ke liye hai
      }
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.msg || err.message || "Failed to fetch user details");
  }
}