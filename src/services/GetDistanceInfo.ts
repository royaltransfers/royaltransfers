import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { Response } from "@/types/common";
import axios from "axios";

export const getDistanceInfo = async (origin: string, destination: string) => {
  try {
    const url = `${ENDPOINTS.distance.getDistance}?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}`;

    const response = await axiosInstance.get(url);
    const responseData: Response<{
      distance: { distanceMeters: string; duration: string };
    }> = response.data;
    return responseData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Error in fetching distance info: ", errorMessage);

      return { errorMessage };
    }
  }
};
