import { appActions } from "./appActions";
import { AppActions } from "./types/appTypes";
import { recipeActions } from "./recipeActions";
import { RecipeActions } from "./types/recipeTypes";

export type Actions = AppActions & RecipeActions;

export const actions: Actions = {
  ...appActions,
  ...recipeActions,
};
