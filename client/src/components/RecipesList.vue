<template>
  <div 
    class="card" 
    v-if="recipes && recipes.length"
  >
    <div class="card-body">
      <ul class="tree-list">
        <RecipeListTree 
          v-for="item in recipes" 
          :key="item.id" 
          :item="item"
        />
      </ul>
    </div>
  </div>
  <div style="text-align: center" v-else>No recipes</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store";
import { toTree } from "../common/helpers/treeHelper";
import RecipeListTree from "./RecipeListTree.vue";
import { ActionRecipeTypes } from "../store/actions/types/recipeTypes";
import { ITreeNode } from "../common/models/recipe/tree";

export default defineComponent({
  name: "RecipesList",
  components: {
    RecipeListTree,
  },
  setup() {
    const store = useStore();
    const recipes = computed(() => toTree(store.getters.recipes));

    const mySelectedFunction = (nodeId: string, action: boolean) => {
      if (action) {
        store.dispatch(ActionRecipeTypes.SET_SELECTED, nodeId);
      } else {
        store.dispatch(ActionRecipeTypes.CLEAR_SELECTED, nodeId);
      }
    };
    const deleteNodeFunction = (node: ITreeNode) =>
      store.dispatch(ActionRecipeTypes.DELETE_RECIPE, node.id);

    const cloneNodeFunction = (node: ITreeNode) =>
      store.dispatch(ActionRecipeTypes.CLONE_RECIPE, node);

    const myCustomOptions = computed(() => ({
      treeEvents: {
        selected: {
          fn: mySelectedFunction,
        },
      },
      cloneNode: {
        fn: cloneNodeFunction,
      },
      deleteNode: {
        fn: deleteNodeFunction,
      },
    }));
    return {
      recipes,
      mySelectedFunction,
      deleteNodeFunction,
      myCustomOptions,
    };
  },
});
</script>
<style scoped>
ul {
  padding-left: 0 !important;
  margin-bottom: 0 !important;
}
.tree-list {
  min-width: 30%;
  overflow: auto;
}
</style>