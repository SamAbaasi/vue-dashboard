<template>
  <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="display-4 text-primary">
          404 - Page Not Found
        </h1>
        <p class="lead">
          The page you are looking for does not exist.
        </p>
        <router-link
          to="/"
          class="btn btn-primary"
        >
          Go to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "NotFoundView",
  };
  </script>
  