import Vue from "vue";
import Vuex from "vuex";
import authModule from "@/store/modules/auth";
import toastModule from "@/store/modules/toast";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    toast: toastModule,
  },
});

export default store;
