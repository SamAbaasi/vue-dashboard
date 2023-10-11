<template>
  <div>
    <AppToast padding />
    <div class="SignForm">
      <!-- This is where the routed components will be displayed -->
      <router-view />
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import AppToast from "@/components/AppToast.vue";
  
  export default defineComponent({
    name: "SignLayout",
    components: {
        AppToast,
    },
  });
  </script>
  <style scoped>
.SignForm {
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
  </style>
  