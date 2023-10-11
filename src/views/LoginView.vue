<template>
  <SignForm
    :type="'login'"
    :loading="loading"
    @form-submit="login"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignForm from "@/components/SignForm.vue";
import store from "@/store";
import type { UserData } from "@/types/user";
type DataShape = {
  loading: boolean;
}
export default defineComponent({
  name: "LoginView",
  components: {
    SignForm,
  },
  data(): DataShape {
    return {
      loading: false,
    };
  },
  methods: {
    async login(userData: UserData) {
      this.loading = true;
      await store.dispatch("login", userData).finally(() => {
        this.loading = false;
      });
    },
  },
});
</script>
