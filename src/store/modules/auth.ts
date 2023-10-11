import {
  loginUser,
  registerUser,
} from "@/api/auth";
import router from "@/router";
import type { UserType, UserData, UserRegisterData } from "@/types/user";
import { MutationTree, ActionTree, GetterTree } from "vuex";

interface AuthState {
  token: string | null;
  user: UserType | null;
}

const state: AuthState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user") ?? "null") ?? null, // Provide a default value of null
};

const getters: GetterTree<AuthState, unknown> = {
  isLoggedIn: (state) => !!state.token,
  userInfo: (state) => state.user,
};

const mutations: MutationTree<AuthState> = {
  SET_TOKEN(state, token: string) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  CLEAR_TOKEN(state) {
    state.token = null;
    localStorage.removeItem("token");
  },
  SET_USER(state, user: UserType) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  CLEAR_USER(state) {
    state.user = null;
    localStorage.removeItem("user");
  },
};

const actions: ActionTree<AuthState, unknown> = {
  async login({ commit }, userData: UserData) {
    try {
      const response = await loginUser(userData);
      const token = response?.user?.token;
      if (token) {
        commit("SET_TOKEN", token);
        commit("SET_USER", response.user); // Save the user information
        router.push({ name: "home" });
        return token;
      }
      // Handle cases where the API response does not contain a token
    } catch (error) {
      // Handle errors, e.g., show an error message
      throw error;
    }
  },

  async register({ commit }, userData: UserRegisterData) {
    const response = await registerUser(userData);
    const token = response?.user?.token;
    if (token) {
      commit("SET_TOKEN", token);
      commit("SET_USER", response.user); // Save the user information
      router.push({ name: "home" });
    }
    return token;
  },
  logout({ commit }) {
    commit("CLEAR_TOKEN");
    commit("CLEAR_USER"); // Clear the user information when logging out
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
