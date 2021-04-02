import { IAppState, appState } from './appState';
import { IRecipeState, recipeState } from './recipeState';

export type State = IAppState & IRecipeState;

export const state: State = {
  ...appState, 
  ...recipeState
}