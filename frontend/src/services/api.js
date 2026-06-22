import axios from 'axios';

// Get API base URL from Vite environment or default to local Flask server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictLoan = async (formData) => {
  try {
    const response = await api.post('/predict', formData);
    return response.data;
  } catch (error) {
    console.error("API Call error details:", error);
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || "Failed to connect to the prediction server.");
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: "unreachable", model_loaded: false };
  }
};
