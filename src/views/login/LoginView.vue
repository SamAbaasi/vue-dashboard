<template>
  <SignForm
    :type="'login'"
    :loading="loading"
    @form-submit="login"
  />
</template>

<script lang="ts">
import Vue from "vue";
import SignForm from "@/components/SignForm/SignForm.vue";
import store from "@/store";
import { UserData } from "@/types/user";
export default Vue.extend({
  name: "LoginView",
  components: {
    SignForm,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getValidationState({
      dirty,
      validated,
      valid = null,
    }: {
      dirty: boolean;
      validated: boolean;
      valid?: null | boolean;
    }) {
      return dirty || validated ? valid : null;
    },
    async login(userData: UserData) {
      this.loading = true;
      await store.dispatch("login", userData).finally(() => {
        this.loading = false;
      });
    },
  },
});
</script>
