import axios, { AxiosError, AxiosResponse } from "axios";
import store from "@/store";
import router from "@/router";

interface ApiResponse<T> {
  data?: T;
  errors?: Record<string, string[]>;
  message?: string;
}

const API_URL = "https://api.realworld.io/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Handle API errors
function handleApiError(error: AxiosError) {
  const { response, request } = error;

  if (response) {
    // The request was made, but the server responded with an error status code
    const { status, data } = response;
    const errorsData = (data as any)?.errors;

    if (status === 404) {
      // Redirect to the Not Found page
      router.push({ name: "not-found" });
      return;
    }

    if (errorsData) {
      for (const key in errorsData) {
        if (Object.prototype.hasOwnProperty.call(errorsData, key)) {
          const errorMessages = errorsData[key];
          errorMessages.forEach((errorMessage: string) => {
            store.dispatch("addToast", {
              message: `${key} ${errorMessage}`,
              variant: "danger",
            });
          });
        }
      }
    } else {
      // Dispatch a general error message for other errors
      const errorMessage = (data as any)?.message || "An error occurred";
      store.dispatch("addToast", {
        message: errorMessage,
        variant: "danger",
      });
    }

  } else if (request) {
    // The request was made, but no response was received (network error)
    // Dispatch a toast for network errors
    store.dispatch("addToast", {
      message: "Network error: Unable to reach the server",
      variant: "danger",
    });
  } else {
    // Something happened in setting up the request or sending it
    store.dispatch("addToast", {
      message: "An error occurred: " + error.message,
      variant: "danger",
    });
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response;
  },
  (error: AxiosError) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
