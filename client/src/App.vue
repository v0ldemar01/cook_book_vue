<template>
  <div class="container container-all">
    <nav class="navbar navbar-light bg-warning">
      <div class="container-fluid container-space">
        <router-link to="/"><img :src="image" width="50" /></router-link>
        <h3 style="color: blue">
          {{ isHome ? "Your recipes" : "Create recipe" }}
        </h3>
        <router-link :to="`${isHome ? '/create' : '/'}`">
          <button class="btn btn-outline-success" type="submit">
            {{ isHome ? "Add recipy" : "To home page" }}
          </button>
        </router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, onUnmounted } from "vue";
import { useStore } from "./store";
import image from "../public/logo.png";

export default {
  setup() {
    const store = useStore();
    const isHome = computed(() => store.getters.isHome);

    return {
      image,
      isHome,
    };
  },
};
</script>
<style lang="stylus">
.spinner
  display flex
  position fixed
  left 0
  right 0
  justify-content center
  top 50%
.container-all {
  max-width 100% !important
  padding 0 !important
}
.container-space {
  width 90% !important
}
</style>
<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");
</style>
