import { ActionTree } from 'vuex';
import { ActionRecipeTypes, RecipeActions } from './types/recipeTypes';
import { RecipeMutationType } from '../mutations/types/recipeTypes';
import { AppMutationType } from '../mutations/types/appTypes';
import { IRecipeState } from '../state/recipeState';
import { IRecipe } from '@/common/models/recipe';

export const recipeActions: ActionTree<IRecipeState, IRecipeState> & RecipeActions = {
  async [ActionRecipeTypes.GET_RECIPES]({ commit }) {
    commit(AppMutationType.SHOW_LOADING);    
    commit(RecipeMutationType.SET_RECIPES, []);
    commit(AppMutationType.HIDE_LOADING);
  },
  async [ActionRecipeTypes.ADD_RECIPE]({ commit }, recipe) {
    commit(AppMutationType.SHOW_LOADING);    
    commit(RecipeMutationType.ADD_RECIPE, recipe);
    commit(AppMutationType.HIDE_LOADING);
  },
  async [ActionRecipeTypes.CLONE_RECIPE]({ commit }, parentId) {
    commit(AppMutationType.SHOW_LOADING);
    commit(RecipeMutationType.CLONE_RECIPE, {} as IRecipe);
    commit(AppMutationType.HIDE_LOADING);
  },
  async [ActionRecipeTypes.UPDATE_RECIPE]({ commit }, recipe) {
    commit(AppMutationType.SHOW_LOADING);
    commit(RecipeMutationType.UPDATE_RECIPE, recipe);
    commit(AppMutationType.HIDE_LOADING);
  },
  async [ActionRecipeTypes.DELETE_RECIPE]({ commit }, id) {
    commit(AppMutationType.SHOW_LOADING);
    commit(RecipeMutationType.DELETE_RECIPE, id);
    commit(AppMutationType.HIDE_LOADING);
  }
}