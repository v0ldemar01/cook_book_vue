import { IRecipe } from "@/common/models/recipe";
import { AppMutations } from "@/store/mutations/appMutations";
import { RecipeMutations } from "@/store/mutations/recipeMutations";
import { IRecipeState } from "@/store/state/recipeState";
import { ActionContext } from "vuex";

export enum ActionRecipeTypes {
  GET_RECIPES = 'GET_RECIPES',
  ADD_RECIPE = 'ADD_RECIPE',
  CLONE_RECIPE = 'CLONE_RECIPE',
  UPDATE_RECIPE = 'UPDATE_RECIPE',
  DELETE_RECIPE = 'DELETE_RECIPE'
}

export type AugmentedActionRecipeContext = {
  commit<K extends keyof (RecipeMutations & AppMutations)>(
    key: K,
    payload?: any
  ): ReturnType<(RecipeMutations & AppMutations)[K]>
} & Omit<ActionContext<IRecipeState, IRecipeState>, 'commit'>


export type RecipeActions = {
  [ActionRecipeTypes.GET_RECIPES](context: AugmentedActionRecipeContext): void;
  [ActionRecipeTypes.ADD_RECIPE](context: AugmentedActionRecipeContext, recipe: IRecipe): void;
  [ActionRecipeTypes.CLONE_RECIPE](context: AugmentedActionRecipeContext, parentId: string): void;
  [ActionRecipeTypes.UPDATE_RECIPE](context: AugmentedActionRecipeContext, recipe: IRecipe): void;
  [ActionRecipeTypes.DELETE_RECIPE](context: AugmentedActionRecipeContext, id: string): void;
}