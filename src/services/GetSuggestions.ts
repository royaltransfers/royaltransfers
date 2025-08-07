import { axiosInstance, ENDPOINTS } from "@/config/api-config";
import { Response } from "@/types/common";
import axios from "axios";

export const getSuggestions = async (input: string) => {
  try {
    const url = `${ENDPOINTS.suggestions.getSuggestions}?input=${input}`;
    const response = await axiosInstance.get(url);
    const responseData: Response<{ suggestions: string[] }> = response.data;
    return responseData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Error in fetching suggestions: ", errorMessage);

      return { errorMessage };
    }
  }
};
