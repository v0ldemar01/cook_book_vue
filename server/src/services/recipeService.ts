/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */

import { getCustomRepository } from 'typeorm';
import { RecipeRepository } from '../data/repositories/recipeRepository';
import { HttpStatusCode } from '../common/constants/http';
import { IRecipe } from '../common/models/recipe';
import { IIngredient } from '../common/models/ingredient';
import { addIngredient } from './ingredientService';

const checkRecipeExistByName = async (name: string): Promise<void> => {
  const recipe = await getCustomRepository(RecipeRepository)
    .getRecipeByName(name);
  if (recipe) {
    throw new Error(`component name already exists in current app, ${HttpStatusCode.BAD_REQUEST}`);
  }
};

export const getRecipes = async (name?: string): Promise<IRecipe[]> => {
  const recipes = await getCustomRepository(RecipeRepository)
    .getRecipes(name);
  if (!recipes) {
    return [];
  }
  return recipes;
};

export const getRecipeById = async (id: string): Promise<IRecipe> => {
  const recipe = await getCustomRepository(RecipeRepository).getRecipeById(id);
  if (!recipe) {
    throw new Error(`Recipe not found, ${HttpStatusCode.NOT_FOUND}`);
  }
  return recipe;
};

export const addRecipe = async (recipe: IRecipe, parentId?: string): Promise<IRecipe> => {
  const { name, ingredients } = recipe;
  await checkRecipeExistByName(name);
  const extension = parentId ? { parentId } : {};
  const createdRecipe = await getCustomRepository(RecipeRepository).addRecipe({ ...recipe, ...extension });
  if (!createdRecipe) {
    throw new Error(`Recipe not created, ${HttpStatusCode.NOT_FOUND}`);
  }
  for (const ingredient of ingredients) {
    await addIngredient({ ...ingredient, recipe: createdRecipe.id } as IIngredient);
  }
  return createdRecipe;
};

export const cloneRecipe = ({
  parentId,
  recipeData
}: {parentId: string, recipeData: IRecipe}) => addRecipe(recipeData, parentId);

export const updateRecipe = async (previewId: string, recipeData: IRecipe): Promise<IRecipe> => {
  await getRecipeById(previewId);
  const { id, ...other } = recipeData;
  const editedRecipe = await getCustomRepository(RecipeRepository).addRecipe({ ...other, previewId });
  if (!editedRecipe) {
    throw new Error(`Recipe not updated, ${HttpStatusCode.NOT_FOUND}`);
  }
  return editedRecipe;
};

export const deleteRecipe = async (id: string): Promise<IRecipe> => {
  const deletedRecipe = await getCustomRepository(RecipeRepository).deleteRecipe(id);
  if (!deletedRecipe) {
    throw new Error(`Recipe not deleted, ${HttpStatusCode.NOT_FOUND}`);
  }
  return deletedRecipe;
};
