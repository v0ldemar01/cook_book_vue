import { IRecipe } from '@/common/models/recipe';
import { GetterTree } from 'vuex';
import { IRecipeState } from '../state/recipeState';

export type RecipeGetters = {
  recipes: (state: IRecipeState) => IRecipe[],
  currentRecipe: (state: IRecipeState) => IRecipe,
  editingRecipe: (state: IRecipeState) => IRecipe,
  recipeCount(state: IRecipeState): number
  getRecipeById(state: IRecipeState): (id :string) => IRecipe | undefined
}

export const recipeGetters: GetterTree<IRecipeState, IRecipeState> & RecipeGetters = {
  recipes: state => state.recipes,
  currentRecipe: state => state.currentRecipe,  
  editingRecipe: state => state.editingRecipe,
  recipeCount: state => state.recipes.length,
  getRecipeById: state => id => state.recipes
    .find(recipe => ((recipe as IRecipe).id as string) === id)
}

