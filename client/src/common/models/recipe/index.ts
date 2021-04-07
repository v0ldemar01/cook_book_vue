import { IIngredient } from "../ingredient";

export interface IRecipe {
  id?: string;
  name: string;
  ingredients: IIngredient[];
  steps: string;
  imageURL?: string;
  parentId?: string;
  prevId?: string;
  nextId?: string;
  createdAt?: string;
  selected?: boolean;
}
