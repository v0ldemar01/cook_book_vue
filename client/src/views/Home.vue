<template>
  <div clas="container">
    <div v-if="loading" class="spinner" >
      <PacmanLoader color="red" />
    </div>
    <div class="d-flex justify-content-between column-container" v-else>
      <div class="col-6 col-elem">
        <div class="col-element">
          <RecipesList />
        </div>
      </div>
      <div class="col-4 col-elem">
        <div class="col-element">
          <RecipeDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, inject } from "vue";
import { useStore } from "../store";
import { ActionRecipeTypes } from "../store/actions/types/recipeTypes";
import RecipeDetail from "../components/RecipeDetail.vue";
import RecipesList from "../components/RecipesList.vue";
import { ActionAppTypes } from "../store/actions/types/appTypes";

export default defineComponent({
  name: "Home",
  components: {
    RecipeDetail,
    RecipesList,
  },
  setup() {
    onMounted(() => store.dispatch(ActionAppTypes.SET_HOME));
    
    const store = useStore();
    const loading = computed(() => store.getters.loading);

    onMounted(() => store.dispatch(ActionRecipeTypes.GET_RECIPES));

    return {
      loading,
    };
  },
});
</script>
<style lang="scss">
.column-container {
  margin: 50px 100px !important;
  flex-wrap: wrap;
}
.col-elem {
  margin: 0 30px !important;
  min-width: 270px;
}
.col-element {
  padding: 15px 10px !important;
}
.col-wrap-elem {
  min-width: 40%;
}
@media (max-width: 1000px) {
  .col-elem {
    min-width: 85%;
    margin: 0 30px !important;
    flex-wrap: wrap;
  }
}
</style>
