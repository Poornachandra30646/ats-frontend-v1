import axios from "axios";

const api = axios.create({
  baseURL:
    "https://ats-final-v1-backend.onrender.com/"
});

export default api;