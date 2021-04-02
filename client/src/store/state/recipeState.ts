import { IRecipe } from "@/common/models/recipe";

export interface IRecipeState {
  recipes: IRecipe[];
  currentRecipe: IRecipe; 
  editingRecipe: IRecipe;
}

export const recipeState: IRecipeState = {
  recipes: [] as IRecipe[],
  currentRecipe: {} as IRecipe,
  editingRecipe: {} as IRecipe
};