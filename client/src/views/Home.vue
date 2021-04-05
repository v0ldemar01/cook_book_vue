<template>
  <div clas="container">
    <div class="spinner" v-if="loading">
      <PacmanLoader color="red" />
    </div>
    <div class="d-flex justify-content-between column-container" v-else>      
      <div class="col-6 col-elem" >
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
import type { Toast } from "vue-dk-toast";

export default defineComponent({
  name: "Home",
  components: {
    RecipeDetail,
    RecipesList,
  },
  setup() {
    const toast = inject<Toast>("$toast");
    onMounted(() => store.dispatch(ActionAppTypes.SET_HOME));
    // if (toast)
    //   toast("Simple!", {
    //     duration: 5000,
    //     type: "error",
    //     positionX: "right",
    //     positionY: "bottom",
    //     disableClick: true,
    //   });
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
