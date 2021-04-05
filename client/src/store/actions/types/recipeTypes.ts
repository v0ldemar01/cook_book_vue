import { IRecipe } from "@/common/models/recipe";
import { AppMutations } from "@/store/mutations/appMutations";
import { RecipeMutations } from "@/store/mutations/recipeMutations";
import { IRecipeState } from "@/store/state/recipeState";
import { ActionContext } from "vuex";

export enum ActionRecipeTypes {
  GET_RECIPES = "GET_RECIPES",
  ADD_RECIPE = "ADD_RECIPE",
  CLONE_RECIPE = "CLONE_RECIPE",
  CLEAR_CLONE_RECIPE = "CLEAR_CLONE_RECIPE",
  UPDATE_RECIPE = "UPDATE_RECIPE",
  DELETE_RECIPE = "DELETE_RECIPE",
  SET_SELECTED = "SET_SELECTED",
  CLEAR_SELECTED = "CLEAR_SELECTED",
}

export type AugmentedActionRecipeContext = {
  commit<K extends keyof (RecipeMutations & AppMutations)>(
    key: K,
    payload?: Parameters<(RecipeMutations & AppMutations)[K]>[1]
  ): ReturnType<(RecipeMutations & AppMutations)[K]>;
} & Omit<ActionContext<IRecipeState, IRecipeState>, "commit">;

export type RecipeActions = {
  [ActionRecipeTypes.GET_RECIPES](
    context: AugmentedActionRecipeContext,
    name: string
  ): void;
  [ActionRecipeTypes.ADD_RECIPE](
    context: AugmentedActionRecipeContext,
    recipe: IRecipe
  ): void;
  [ActionRecipeTypes.CLONE_RECIPE](
    context: AugmentedActionRecipeContext,
    recipe: IRecipe
  ): void;
  [ActionRecipeTypes.UPDATE_RECIPE](
    context: AugmentedActionRecipeContext,
    recipe: IRecipe
  ): void;
  [ActionRecipeTypes.DELETE_RECIPE](
    context: AugmentedActionRecipeContext,
    id: string
  ): void;
  [ActionRecipeTypes.SET_SELECTED](
    context: AugmentedActionRecipeContext,
    id: string
  ): void;
  [ActionRecipeTypes.CLEAR_SELECTED](
    context: AugmentedActionRecipeContext
  ): void;
  [ActionRecipeTypes.CLEAR_CLONE_RECIPE](
    context: AugmentedActionRecipeContext
  ): void;
};
