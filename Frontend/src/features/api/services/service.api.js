import axios from "axios";

// Vite ke liye custom env variable use karein (VITE_ prefix zaroori hai)
const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export async function GenerateReport({
  selfDescription,
  resumeFile,
  jobDescription,
}) {
  try {
    const formData = new FormData();
    formData.append("selfDescription", selfDescription);
    formData.append("resumeFile", resumeFile);
    formData.append("jobDescription", jobDescription);
    const response = await axios.post(
      `${API_URL}/service/aireport`,
      { selfDescription, 
        resume: resumeFile,
         jobDescription },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Report generation failed");
  }
}

export async function GetUserReports() {
  try {
    const reports = await axios.get(`${API_URL}/service/myreports`, {
      withCredentials: true,
    });

    return reports;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
}
