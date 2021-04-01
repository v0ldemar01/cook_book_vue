import { IIngredient } from '../ingredient';

export interface IRecipe {
  name: string;
  ingredients: IIngredient[],
  steps: string;
  imageURL?: string;
}
