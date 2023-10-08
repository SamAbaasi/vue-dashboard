<template>
  <div>
    <navbar-view :user="user" @logout="handleLogout" />
    <div class="d-flex">
      <sidebar-view />
      <b-container fluid class="router-container">
        <!-- This is where the routed components will be displayed -->
        <Toast />
        <router-view></router-view>
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import SidebarView from "@/components/Sidebar/SidebarView.vue";
import NavbarView from "@/components/Navbar/NavbarView.vue";
import router from "@/router";
import { LOGIN } from "@/routes";
import store from "@/store";
import Toast from "@/components/Toast/ToastView.vue";
// import { mapActions, mapState } from "vuex";

export default {
  name: "AppLayout",
  components: {
    SidebarView,
    NavbarView,
    Toast,
  },
  computed: {
    // ...mapState("auth", ["user"]),
    user() {
      return store.getters.userInfo;
    },
  },
  methods: {
    // ...mapActions("auth", ["logout"]),
    handleLogout() {
      store.dispatch("logout");
      // this.logout();
      router.push({ name: LOGIN });
    },
  },
};
</script>
<style scoped>
.router-container {
  padding: 25px 30px;
}
</style>
