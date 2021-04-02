import { AppMutations } from "@/store/mutations/appMutations"
import { IAppState } from "@/store/state/appState"
import { ActionContext } from "vuex"

export enum ActionAppTypes {
  SHOW_LOADING = 'SHOW_LOADING',
  HIDE_LOADING = 'HIDE_LOADING',
  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SET_EDITING = 'SET_EDITING',
  CANCEL_EDITING = 'CANCEL_EDITING',
  SET_CREATING = 'SET_CREATING',
  CANCEL_CREATING = 'CANCEL_CREATING',
}

export type AugmentedActionAppContext = {
  commit<K extends keyof AppMutations>(
    key: K,
    payload?: any
  ): ReturnType<AppMutations[K]>
} & Omit<ActionContext<IAppState, IAppState>, 'commit'>

export type AppActions = {
  [ActionAppTypes.SHOW_LOADING](context: AugmentedActionAppContext): void;
  [ActionAppTypes.HIDE_LOADING](context: AugmentedActionAppContext): void;
  [ActionAppTypes.SET_ERROR](context: AugmentedActionAppContext, error: string): void;
  [ActionAppTypes.CLEAR_ERROR](context: AugmentedActionAppContext): void;
  [ActionAppTypes.SET_EDITING](context: AugmentedActionAppContext): void;
  [ActionAppTypes.CANCEL_EDITING](context: AugmentedActionAppContext): void;
  [ActionAppTypes.SET_CREATING](context: AugmentedActionAppContext): void;
  [ActionAppTypes.CANCEL_CREATING](context: AugmentedActionAppContext): void;  
}