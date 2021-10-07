import axios from "axios";

const apis = {
  development: process.env.REACT_APP_API_BASE,
  production: "https://so-fit-server.herokuapp.com/api",
};

// Setting up the backend URL to axios (dev or production)
const api = axios.create({
  baseURL: apis[process.env.NODE_ENV],
});

// Configing axios to inject the Authentication Header in any request the request
api.interceptors.request.use((config) => {
  // Verifying if there is any info for the user in the localStorage
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  if (loggedInUser.token) {
    config.headers = {
      Authorization: `Bearer ${loggedInUser.token}`,
    };
  }

  return config;
});

export default api;
