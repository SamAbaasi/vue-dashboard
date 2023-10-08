<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand to="/">
      Arvan Challenge
    </b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item>
        <p class="text-light p-0 m-0">
          Welcome {{ user?.username }}
        </p>
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-button
        variant="outline-info"
        @click="logout"
      >
        Logout
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import { UserType } from "@/types/user";
import { PropType } from "vue";

export default {
  props: {
    user: {
      type: Object as PropType<UserType | null>,
      default: null,
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
