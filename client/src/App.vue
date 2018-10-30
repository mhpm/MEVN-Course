<template>
  <div id="app">
    <div class="container">
      <Posts />
    </div>
  </div>
</template>

<script>
import Posts from "./components/Posts.vue";

export default {
  name: "app",
  components: {
    Posts
  }
};
</script>

<style>
</style>
