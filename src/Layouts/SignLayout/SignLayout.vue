<template>
  <div>
    <Toast padding />
    <div class="SignForm">
      <!-- This is where the routed components will be displayed -->
      <router-view />
    </div>
  </div>
</template>
  
  <script lang="ts">
  import Toast from "@/components/Toast/ToastView.vue";
  
  export default {
    name: "SignLayout",
    components: {
      Toast,
    },
  };
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
  