<template>
  <div class="position-relative">
    <div class="toast-container">
      <b-alert
        v-for="toast in toasts"
        :key="toast.id"
        :show="toast.show"
        dismissible
        :variant="toast.variant"
        :class="['custom-toast', toastClass]"
      >
        <span
          v-if="toast.boldMessage"
          class="font-weight-bold mr-1"
        >{{
          toast.boldMessage
        }}</span>
        {{ toast.message }}
      </b-alert>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: 'AppToast',
  props: {
    padding: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dismissSecs: 5,
    };
  },
  computed: {
    toasts() {
      return store.getters.toasts;
    },
    toastClass(): string {
      return this.padding ? "with-padding" : "";
    },
  },
  watch: {
    // Watch for changes in the toasts array
    toasts: {
      deep: true,
      immediate: true,
      handler(newToasts) {
        newToasts.forEach((toast: { show: boolean }, index: number) => {
          // Set a timeout to show each toast with a 500 milliseconds delay
          setTimeout(() => {
            toast.show = true;
          }, (index + 1) * 500); // Delay by 500 milliseconds for each toast
        });
      },
    },
  },
  methods: {
    dismissToast(id: number) {
      store.dispatch("removeToast", id);
    },
  },
});
</script>

<style lang="scss" scoped>
.toast-container {
  position: absolute !important;
  right: 0px;
  top: 0px;
  z-index: 2;
}

.custom-toast {
  max-width: 600px;
  animation: fadeIn 0.5s ease-in-out, slideIn 0.5s ease-in-out;
  transform-origin: top center; /* Set transform origin to top center */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(0);
  }
}

.with-padding {
  right: 30px;
  top: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
