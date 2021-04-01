/* eslint-disable no-restricted-syntax */
import { createConnection } from 'typeorm';
import { addRecipe } from '../../services/recipeService';
import { recipesSeed } from '../seed-data/recipesSeed';

(async () => {
  await createConnection();
  for (const recipe of recipesSeed) {
    await addRecipe(recipe);
  }
})();
