<template>
  <SignForm
    :type="'register'"
    :loading="loading"
    @form-submit="register"
  />
</template>

<script lang="ts">
import Vue from "vue";
import SignForm from "@/components/SignForm.vue";
import store from "@/store";
import { UserData } from "@/types/user";

export default Vue.extend({
  name: "RegisterView",
  components: {
    SignForm,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async register(userData: UserData) {
      this.loading = true;
      await store.dispatch("register", userData).finally(() => {
        this.loading = false;
      });
    },
  },
});
</script>
