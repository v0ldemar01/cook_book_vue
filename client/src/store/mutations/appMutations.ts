import { MutationTree } from "vuex";
import { IAppState } from "../state/appState";
import { AppMutationType } from "./types/appTypes";

export type AppMutations = {
  [AppMutationType.SHOW_LOADING](state: IAppState): void;
  [AppMutationType.HIDE_LOADING](state: IAppState): void;
  [AppMutationType.SET_ERROR](state: IAppState, error: string): void;
  [AppMutationType.CLEAR_ERROR](state: IAppState): void;
  [AppMutationType.SET_EDITING](state: IAppState): void;
  [AppMutationType.CANCEL_EDITING](state: IAppState): void;
  [AppMutationType.SET_CREATING](state: IAppState): void;
  [AppMutationType.CANCEL_CREATING](state: IAppState): void;
  [AppMutationType.SET_HOME](state: IAppState): void;
  [AppMutationType.SET_CLONING](state: IAppState): void;
  [AppMutationType.CANCEL_CLONING](state: IAppState): void;
};

export const appMutations: MutationTree<IAppState> & AppMutations = {
  [AppMutationType.SHOW_LOADING](state) {
    state.loading = true;
  },
  [AppMutationType.HIDE_LOADING](state) {
    state.loading = false;
  },
  [AppMutationType.SET_ERROR](state, error) {
    state.error = error;
  },
  [AppMutationType.CLEAR_ERROR](state) {
    state.error = "";
  },
  [AppMutationType.SET_EDITING](state) {
    state.isEditing = true;
  },
  [AppMutationType.CANCEL_EDITING](state) {
    state.isEditing = false;
  },
  [AppMutationType.SET_CREATING](state) {
    state.isCreating = true;
  },
  [AppMutationType.CANCEL_CREATING](state) {
    state.isCreating = false;
  },
  [AppMutationType.SET_HOME](state) {
    state.isEditing = false;
    state.isCreating = false;
    state.isCloning = false;
  },
  [AppMutationType.SET_CLONING](state) {
    state.isCloning = true;
  },
  [AppMutationType.CANCEL_CLONING](state) {
    state.isCloning = false;
  },
};
