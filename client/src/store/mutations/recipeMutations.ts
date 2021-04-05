import { IRecipe } from "@/common/models/recipe";
import { MutationTree } from "vuex";
import { IRecipeState } from "../state/recipeState";
import { RecipeMutationType } from "./types/recipeTypes";

export type RecipeMutations = {
  [RecipeMutationType.SET_RECIPES](
    state: IRecipeState,
    recipes: IRecipe[]
  ): void;
  [RecipeMutationType.ADD_RECIPE](state: IRecipeState, recipe: IRecipe): void;
  [RecipeMutationType.CLONE_RECIPE](state: IRecipeState, recipe: IRecipe): void;
  [RecipeMutationType.UPDATE_RECIPE](
    state: IRecipeState,
    newRecipe: IRecipe
  ): void;
  [RecipeMutationType.DELETE_RECIPE](state: IRecipeState, id: string): void;
  [RecipeMutationType.SET_SELECTED](state: IRecipeState, id: string): void;
  [RecipeMutationType.CLEAR_SELECTED](state: IRecipeState): void;
  [RecipeMutationType.CLEAR_CLONE_RECIPE](state: IRecipeState): void;
};

export const recipeMutations: MutationTree<IRecipeState> & RecipeMutations = {
  [RecipeMutationType.SET_RECIPES](state, recipes) {
    state.recipes = [...recipes];
  },
  [RecipeMutationType.ADD_RECIPE](state, recipe) {
    state.recipes = [...state.recipes, recipe];
  },
  [RecipeMutationType.CLONE_RECIPE](state, recipe) {
    state.cloningRecipe = recipe;
  },
  [RecipeMutationType.UPDATE_RECIPE](state, newRecipe) {
    const prevRecipe = state.recipes.find(
      (recipe) => recipe.id === newRecipe.prevId
    );
    if (prevRecipe) prevRecipe.nextId = newRecipe.id;
    state.recipes = [...state.recipes, newRecipe];
  },
  [RecipeMutationType.DELETE_RECIPE](state, id: string) {
    state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    if (state.currentRecipe.id === id) {
      state.currentRecipe = {} as IRecipe;
    }
  },
  [RecipeMutationType.SET_SELECTED](state, id: string) {
    const currentRecipe = state.recipes.find((recipe) => recipe.id === id);
    state.currentRecipe = currentRecipe as IRecipe;
  },
  [RecipeMutationType.CLEAR_SELECTED](state) {
    state.currentRecipe = {} as IRecipe;
  },
  [RecipeMutationType.CLEAR_CLONE_RECIPE](state) {
    state.cloningRecipe = {} as IRecipe;
  },
};
