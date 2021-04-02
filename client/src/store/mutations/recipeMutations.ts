import { IRecipe } from '@/common/models/recipe';
import { MutationTree } from 'vuex';
import { IRecipeState } from '../state/recipeState';
import { RecipeMutationType } from './types/recipeTypes';

export type RecipeMutations = {
  [RecipeMutationType.SET_RECIPES](state: IRecipeState, recipes: IRecipe[]): void;
  [RecipeMutationType.ADD_RECIPE](state: IRecipeState, recipe: IRecipe): void;
  [RecipeMutationType.CLONE_RECIPE](state: IRecipeState, recipe: IRecipe): void;
  [RecipeMutationType.UPDATE_RECIPE](state: IRecipeState, recipe: IRecipe): void;
  [RecipeMutationType.DELETE_RECIPE](state: IRecipeState, id: string): void;
};

export const recipeMutations: MutationTree<IRecipeState> & RecipeMutations = {
  [RecipeMutationType.SET_RECIPES](state, recipes) {
    state.recipes = [...recipes];
  },
  [RecipeMutationType.ADD_RECIPE](state, recipe) {
    state.recipes = [...state.recipes, recipe];
  },
  [RecipeMutationType.CLONE_RECIPE](state, recipe) {
    state.recipes = [...state.recipes, recipe];
  },
  [RecipeMutationType.UPDATE_RECIPE](state, recipe) {
    state.recipes = [...state.recipes, recipe];
  },
  [RecipeMutationType.DELETE_RECIPE](state, id: string) {
    state.recipes = [...state.recipes].filter(recipe => recipe.id !== id);
  }
}