import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { UserData, UserRegisterData } from "@/types/user";

export const registerUser = async (userData: UserRegisterData) => {
  const response: AxiosResponse = await axios.post("/users", {
    user: userData,
  });
  return response.data;
};

export const loginUser = async (user: UserData) => {
  const response: AxiosResponse = await axios.post("/users/login", {
    user,
  });
  return response.data;
};
