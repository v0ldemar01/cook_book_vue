<template>
  <li class="tree-row">
    <div 
      class="tree-node" 
      @click="selectItem(current_item.id)"
    >
      <span 
        class="icon_parent"
        v-if="isParentRoot" 
        @click="expandItem"        
      >
        <i :class="['bi', isOpen ? 'bi-caret-down-square' : 'bi-caret-right-square']"></i>
      </span>
      <span style="padding-left: 1.55rem" v-else />    
      <span :class="[isSelected ? 'element-active' : '']">
        {{ current_item.text }}
      </span>
      <span 
        class="icon_parent icon-right"
        @click.stop="cloneItem(current_item)" 
      >
        <i class="bi bi-node-plus"></i>
      </span>
      <span 
        class="icon_parent icon-right" 
        @click.stop="deleteItem(current_item.id)" 
      >
        <i class="bi bi-node-minus"></i>
      </span>
    </div>
    <ul v-show="isOpen" v-if="isParentRoot">
      <RecipeListTree
        v-for="child in current_item.nodes"
        :key="child.id"
        :item="child"          
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { computed, reactive, ref } from "vue";
import { ITreeNode } from "../common/models/recipe/tree";
import { useStore } from "../store";
import { ActionRecipeTypes } from "../store/actions/types/recipeTypes";

export default {
  name: "TreeElement",
  props: {
    item: { type: Object },
  },
  setup(props) {
    const store = useStore();
    const isOpen = ref(false);
    const current_item = reactive(props.item as ITreeNode);
    const isParentRoot = computed(() => current_item.nodes);
    const currentRecipe = computed(() => store.getters.currentRecipe);
    const isSelected = computed(() => currentRecipe.value.id === current_item.id && currentRecipe.value.selected);
    
    const selectItem = (itemId: string) => {         
      if (isSelected.value) {        
        store.dispatch(ActionRecipeTypes.CLEAR_SELECTED, itemId);
      } else {        
        store.dispatch(ActionRecipeTypes.SET_SELECTED, itemId);        
      }      
    };
    const expandItem = () => {
      isOpen.value = !isOpen.value;
    };
    const deleteItem = (itemId: string) =>
      store.dispatch(ActionRecipeTypes.DELETE_RECIPE, itemId);

    const cloneItem = (item: ITreeNode) =>
      store.dispatch(ActionRecipeTypes.CLONE_RECIPE, item);

    return {
      current_item,
      isSelected,
      isOpen,
      isParentRoot,
      expandItem,
      selectItem,
      deleteItem,
      cloneItem,
    };
  },
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
.tree-row {
  width: 500px;
  cursor: pointer;
}
.tree-node {
  height: 35px,
}
.element-active {
  font-weight: bold;
  color: red,
}
.icon_parent {
  background: transparent;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  margin: 0 0.25rem 0 0;
  i {
    font-size: 16px;
    line-height: 10px;
  }
}
.icon-right {
  padding-left: 0.5rem;
}
</style>
