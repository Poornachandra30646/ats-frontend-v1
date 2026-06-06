import axios from "axios";

const api = axios.create({

  baseURL:
    "https://api.atscheckerpro.online/api/v1"

});

export default api;