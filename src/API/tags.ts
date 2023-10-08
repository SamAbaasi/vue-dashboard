import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

// Get all articles
export const getAllTags = async () => {
  const response: AxiosResponse = await axios.get("/tags");
  return response.data;
};
