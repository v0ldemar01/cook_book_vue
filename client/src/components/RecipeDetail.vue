<template>
  <div class="card" v-if="!isEmpty">
    <img
      v-if="currentRecipe.imageURL"
      class="card-img-top"
      :src="currentRecipe.imageURL"
      alt="Card image cap"      
    />
    <div class="card-body">
      <div class="d-flex">
        <h5 
          class="card-title" 
          style="float: left;"
        >
          {{ currentRecipe.name }}
        </h5>
        <div style="padding: 0.25rem" />       
        <p 
          class="card-title" 
          style="float: right;"
        >
          {{ Date(currentRecipe.createdAt).toLocaleString({ timeZone: 'Europe/Kiev' }) }}
        </p>
      </div>      
      <span 
        v-if="currentRecipe.ingredients.length" 
        class="card-element" 
      >
        Ingredients:
      </span
    >
    </div>
    <ul
      class="list-group list-group-flush"
      v-if="currentRecipe.ingredients.length"
    >
      <li
        class="list-group-item"
        v-for="ingredient in currentRecipe.ingredients"
        :key="ingredient.id"
      >
        <span>{{ ingredient.name }} - {{ ingredient.quantity }}</span>
      </li>
    </ul>
    <div class="card-body">
      <span>{{ currentRecipe.steps.replace(/.,/g, ".\n") }}</span>
      <p />
      <div class="d-flex flex-row justify-content-around">
        <button
          v-if="currentRecipe.prevId"
          class="btn btn-danger"
          @click="selectRecipeId(currentRecipe.prevId)"          
        >
          <i class="bi bi-arrow-return-left"></i> Previous version
        </button>
        <router-link :to="'/edit/' + currentRecipe.id">
          <button class="btn btn-warning" @click="updateRecipe">
            Edit <i class="bi bi-tools"></i>
          </button>
        </router-link>
        <button
          v-if="currentRecipe.nextId"
          class="btn btn-danger"
          @click="selectRecipeId(currentRecipe.nextId)"          
        >
          Next version <i class="bi bi-arrow-return-right"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="card" style="text-align: center" v-else>
    No recipe is selected
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import { ActionAppTypes } from "../store/actions/types/appTypes";
import { ActionRecipeTypes } from "../store/actions/types/recipeTypes";

export default defineComponent({
  name: "RecipeDetail",
  setup() {
    const store = useStore();
    const currentRecipe = computed(() => store.getters.currentRecipe);
    const isEmpty = computed(() => Object.keys(currentRecipe.value).length === 0);
    const updateRecipe = () => store.dispatch(ActionAppTypes.SET_EDITING);
    const selectRecipeId = nodeId =>
      store.dispatch(ActionRecipeTypes.SET_SELECTED, nodeId);

    return {
      currentRecipe,
      isEmpty,
      updateRecipe,
      selectRecipeId,
    };
  },
});
</script>
