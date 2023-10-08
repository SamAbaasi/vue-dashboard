<template>
  <div
    class="sidebar d-flex flex-column justify-content-start align-items-start text-light"
  >
    <h3 class="sidebar-title">
      Post
    </h3>
    <b-nav vertical>
      <b-nav-item
        v-for="route in dynamicTabRoutes"
        :key="route.name"
        :active="activeTab === route.name"
        @click="navigateTo(route.name)"
      >
        <p class="sidebar-item-text">
          {{ route.title }}
        </p>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";

export default Vue.extend({
  computed: {
    activeTab(): string {
      const routeName = this.$route.name;
      return routeName || "home";
    },
    dynamicTabRoutes(): { name: string; title: string }[] {
      return [
        { name: "home", title: "All Articles" },
        { name: "new-article", title: "New Article" },
      ];
    },
  },

  methods: {
    navigateTo(routeName: string) {
      // Check if the target route is the same as the current route
      if (this.$route.name !== routeName) {
        router.push({ name: routeName });
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.sidebar {
  width: 250px;
  background-color: #1c7cd5;
  height: calc(100vh - 56px);
  color: #fff;
}
.sidebar-title {
  margin: 16px 20px;
}
.sidebar-item-text {
  padding: 12px 34px;
  margin: 0px;
}
.nav {
  width: 100%;
}
.nav-link {
  color: #fff;
  display: block;
  padding: 0px;
  text-align: left;
  margin: 0px;
  transition: all 0.3s ease-in-out;
}
.active {
  background: rgba(255, 255, 255, 0.15);
}
</style>
