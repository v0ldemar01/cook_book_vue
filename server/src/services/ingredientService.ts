/* eslint-disable no-restricted-syntax */

import { getCustomRepository } from 'typeorm';
import { IngredientRepository } from '../data/repositories/ingredientRepository';
import { HttpStatusCode } from '../common/constants/http';
import { IIngredient } from '../common/models/ingredient';

export const addIngredient = async (ingredient: IIngredient): Promise<IIngredient> => {
  const createdIngredient = await getCustomRepository(IngredientRepository).addIngredient(ingredient);
  if (!createdIngredient) {
    throw new Error(`Ingredient not created, ${HttpStatusCode.NOT_FOUND}`);
  }
  return createdIngredient;
};
