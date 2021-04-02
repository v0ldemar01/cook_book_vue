import { AppGetters, appGetters } from './appGetters';
import { RecipeGetters, recipeGetters } from './recipeGetters';

export type Getters = AppGetters & RecipeGetters;

export const getters: Getters = {
  ...appGetters, 
  ...recipeGetters
}