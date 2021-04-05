import { url } from "@/common/constants";
import api from "../common/helpers/apiHelper";
import { IRecipe } from "../common/models/recipe";

export const getRecipes = (name?: string) =>
  api.get<IRecipe[]>(`${url}/api/recipes`, { name });

export const addRecipe = (recipe: IRecipe) =>
  api.post<IRecipe>(`${url}/api/recipes`, recipe);

export const updateRecipe = (recipe: IRecipe) =>
  api.put<IRecipe>(`${url}/api/recipes/${recipe.id}`, recipe);

export const deleteRecipe = (id: string) =>
  api.delete<IRecipe>(`${url}/api/recipes/${id}`);
