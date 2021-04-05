import { ActionTree } from "vuex";
import router from "../../router";
import { ActionRecipeTypes, RecipeActions } from "./types/recipeTypes";
import { RecipeMutationType } from "../mutations/types/recipeTypes";
import { AppMutationType } from "../mutations/types/appTypes";
import { IRecipeState } from "../state/recipeState";
import {
  addRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "@/services/recipeService";

export const recipeActions: ActionTree<IRecipeState, IRecipeState> &
  RecipeActions = {
  async [ActionRecipeTypes.GET_RECIPES]({ commit }, name = "") {
    commit(AppMutationType.SHOW_LOADING);
    getRecipes(name).then((data) => {
      commit(RecipeMutationType.SET_RECIPES, data);
      commit(AppMutationType.HIDE_LOADING);
    });
  },
  async [ActionRecipeTypes.ADD_RECIPE]({ commit }, recipe) {
    commit(AppMutationType.SHOW_LOADING);
    addRecipe(recipe).then((data) => {
      commit(RecipeMutationType.ADD_RECIPE, data);
      commit(AppMutationType.HIDE_LOADING);
      commit(AppMutationType.SET_HOME);
      router.push("/");
    });
  },
  async [ActionRecipeTypes.CLONE_RECIPE]({ commit }, recipe) {
    commit(RecipeMutationType.CLONE_RECIPE, recipe);
    commit(AppMutationType.SET_CLONING);
    router.push("/clone");
  },
  async [ActionRecipeTypes.UPDATE_RECIPE]({ commit }, recipe) {
    commit(AppMutationType.SHOW_LOADING);
    updateRecipe(recipe).then((data) => {
      commit(RecipeMutationType.UPDATE_RECIPE, data);
      commit(AppMutationType.HIDE_LOADING);
      router.push("/");
    });
  },
  async [ActionRecipeTypes.DELETE_RECIPE]({ commit }, id) {
    deleteRecipe(id).then(() => {
      commit(RecipeMutationType.DELETE_RECIPE, id);
    });
  },
  async [ActionRecipeTypes.SET_SELECTED]({ commit }, id) {
    commit(RecipeMutationType.SET_SELECTED, id);
  },
  async [ActionRecipeTypes.CLEAR_SELECTED]({ commit }) {
    commit(RecipeMutationType.CLEAR_SELECTED);
  },
  async [ActionRecipeTypes.CLEAR_CLONE_RECIPE]({ commit }) {
    commit(RecipeMutationType.CLEAR_CLONE_RECIPE);
  },
};
