<template>
  <div>
    <TheNavbar
      :user="user"
      @logout="handleLogout"
    />
    <div class="d-flex">
      <TheSidebar />
      <b-container
        fluid
        class="router-container"
      >
        <AppToast />
        <!-- This is where the routed components will be displayed -->
        <router-view />
      </b-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheSidebar from "@/components/TheSidebar.vue";
import TheNavbar from "@/components/TheNavbar.vue";
import router from "@/router";
import { LOGIN } from "@/routes";
import store from "@/store";
import AppToast from "@/components/AppToast.vue";
import type { UserType } from "@/types/user";
// import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "AppLayout",
  components: {
    TheSidebar,
    TheNavbar,
    AppToast,
  },
  computed: {
    // ...mapState("auth", ["user"]),
    user(): UserType | null {
      return store.getters.userInfo;
    },
  },
  methods: {
    // ...mapActions("auth", ["logout"]),
    handleLogout() {
      store.dispatch("logout");
      router.push({ name: LOGIN });
    },
  },
});
</script>
<style scoped>
.router-container {
  padding: 25px 30px;
}
</style>
