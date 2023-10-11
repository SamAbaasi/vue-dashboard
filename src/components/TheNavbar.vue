<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-navbar-brand to="/">
      Articles
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
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { UserType } from "@/types/user";

export default defineComponent({
  name: 'TheNavbar',
  props: {
    user: {
      type: Object as PropType<UserType | null>,
      default: null,
      required: true,
    },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
});
</script>
