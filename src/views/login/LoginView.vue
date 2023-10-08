<template>
  <div>
    <Toast padding />
    <SignForm
      :type="'login'"
      :loading="loading"
      @form-submit="login"
    />
  </div>
</template>

<script lang="ts">
import SignForm from "@/components/SignForm/SignForm.vue";
import store from "@/store";
import { UserData } from "@/types/user";
import Toast from "@/components/Toast/ToastView.vue";
export default {
  name: "LoginView",
  components: {
    SignForm,
    Toast,
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
};
</script>
