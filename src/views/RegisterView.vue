<template>
  <SignForm
    :type="'register'"
    :loading="loading"
    @form-submit="register"
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
  name: "RegisterView",
  components: {
    SignForm,
  },
  data(): DataShape {
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
