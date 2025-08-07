import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { getCoordinates } from "./GetCoordinates";
import axios from "axios";

export const getCurrentLocation = async () => {
  const location = await getCoordinates();

  if (!location.status || !location.data) {
    return {
      status: false,
      message: location.message,
      data: null,
    };
  }

  const { lat, lng } = location.data;

  try {
    const url = `${ENDPOINTS.currentLocation.getCurrentLocation}?lat=${lat}&lng=${lng}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data?.message || "Server error"
        : error instanceof Error
        ? error.message
        : String(error);

    return {
      status: false,
      message: errorMessage,
      data: null,
    };
  }
};
