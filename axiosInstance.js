import axios, { HeadersDefaults } from 'axios';

const axiosClient = axios.create();

// Replace this with our own backend base URL
// axiosClient.defaults.baseURL = 'https://api.example.org/';



axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

// Adding Authorization header for all requests

axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    // console.log("token",token);
    if (token) {
      // Configure this as per your backend requirements
      config.headers['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosClient;
