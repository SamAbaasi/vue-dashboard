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

export const loginAndRememberToken = async (user: UserData) => {
  const response: AxiosResponse = await axios.post("/users/login", {
    user,
  });
  const token = response.data?.user?.token;
  if (token) {
    // Save the token to local storage
    localStorage.setItem("token", token);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response: AxiosResponse = await axios.get("/user");
  return response.data;
};

export const updateUser = async (userUpdateData: UserData) => {
  const response: AxiosResponse = await axios.put("/user", {
    user: userUpdateData,
  });
  return response.data;
};
