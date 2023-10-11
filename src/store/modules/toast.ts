import { Commit, GetterTree } from "vuex";
import { v4 as uuidv4 } from "uuid";
import type { Toast } from "@/types/toast";

interface ToastState {
  toasts: Array<Toast>;
}

const state: ToastState = {
  toasts: [],
};

const getters: GetterTree<ToastState, unknown> = {
  toasts: (state) => state.toasts,
};

const mutations = {
  ADD_TOAST(
    state: ToastState,
    payload: { message: string; variant?: string; boldMessage?: string }
  ) {
    const toast: Toast = {
      id: uuidv4(),
      message: payload.message,
      variant: payload.variant || "success",
      boldMessage: payload.boldMessage || "",
      timerId: null,
      show: false,
    };

    // Push the new toast to the array
    state.toasts.push(toast);

    // Automatically remove the toast after 5 seconds
    toast.timerId = setTimeout(() => {
      const index = state.toasts.findIndex((t) => t.id === toast.id);
      if (index !== -1) {
        state.toasts.splice(index, 1); // Remove the toast
      }
    }, 5000);
  },
  REMOVE_TOAST(state: ToastState, id: string) {
    const index = state.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      const toast = state.toasts[index];
      if (toast.timerId !== null) {
        clearTimeout(toast.timerId);
      }
      state.toasts.splice(index, 1);
    }
  },
};

const actions = {
  addToast(
    { commit }: { commit: Commit },
    payload: { message: string; variant?: string; boldMessage?: string }
  ) {
    commit("ADD_TOAST", payload);
  },

  removeToast({ commit }: { commit: Commit }, index: number) {
    commit("REMOVE_TOAST", index);
  },
};

const toastModule = {
  state,
  mutations,
  actions,
  getters,
};

export default toastModule;
