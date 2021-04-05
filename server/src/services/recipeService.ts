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

export const getRecipes = async ({ name }: {name?: string}): Promise<IRecipe[]> => {
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

export const addRecipe = async (recipe: IRecipe): Promise<IRecipe> => {
  const { name, ingredients } = recipe;
  await checkRecipeExistByName(name);
  const createdRecipe = await getCustomRepository(RecipeRepository).addRecipe(recipe);
  if (!createdRecipe) {
    throw new Error(`Recipe not created, ${HttpStatusCode.NOT_FOUND}`);
  }
  for (const ingredient of ingredients) {
    await addIngredient({ ...ingredient, recipe: createdRecipe.id } as IIngredient);
  }
  return createdRecipe;
};

export const updateRecipe = async (prevId: string, recipeData: IRecipe): Promise<IRecipe> => {
  const prevRecipe = await getRecipeById(prevId);
  const { id, ...other } = recipeData;
  const { ingredients, ...others } = prevRecipe;
  const newRecipe = await getCustomRepository(RecipeRepository).addRecipe({ ...other, prevId });
  const editedRecipe = await getCustomRepository(RecipeRepository).updateRecipe(prevId, {
    ...others,
    nextId: newRecipe.id
  });
  if (!editedRecipe) {
    throw new Error(`Recipe not updated, ${HttpStatusCode.NOT_FOUND}`);
  }
  return newRecipe;
};

export const deleteRecipe = async (id: string): Promise<IRecipe> => {
  const deletedRecipe = await getCustomRepository(RecipeRepository).deleteRecipe(id);
  if (!deletedRecipe) {
    throw new Error(`Recipe not deleted, ${HttpStatusCode.NOT_FOUND}`);
  }
  return deletedRecipe;
};
