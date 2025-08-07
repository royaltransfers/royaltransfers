import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const ENDPOINTS = {
  currentLocation: {
    getCurrentLocation: "/api/current-location",
  },
  suggestions: {
    getSuggestions: "/api/places-autocomplete",
  },
  distance: {
    getDistance: "/api/distance-matrix",
  },
};
