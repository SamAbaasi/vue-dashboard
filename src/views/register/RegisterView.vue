<template>
  <div>
    <Toast padding />
    <SignForm
      :type="'register'"
      :loading="loading"
      @form-submit="register"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SignForm from "@/components/SignForm/SignForm.vue";
import store from "@/store";
import { UserData } from "@/types/user";
import Toast from "@/components/Toast/ToastView.vue";

export default Vue.extend({
  name: "RegisterView",
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
    //improve validations add global methods for validations
    async register(userData: UserData) {
      this.loading = true;
      await store.dispatch("register", userData).finally(() => {
        this.loading = false;
      });
    },
  },
});
</script>
