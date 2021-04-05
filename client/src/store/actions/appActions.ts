import { ActionTree } from "vuex";
import { AppMutationType } from "../mutations/types/appTypes";
import { IAppState } from "../state/appState";
import { ActionAppTypes, AppActions } from "./types/appTypes";

export const appActions: ActionTree<IAppState, IAppState> & AppActions = {
  async [ActionAppTypes.SHOW_LOADING]({ commit }) {
    commit(AppMutationType.SHOW_LOADING);
  },
  async [ActionAppTypes.HIDE_LOADING]({ commit }) {
    commit(AppMutationType.HIDE_LOADING);
  },
  async [ActionAppTypes.SET_ERROR]({ commit }, error) {
    commit(AppMutationType.SET_ERROR, error);
  },
  async [ActionAppTypes.CLEAR_ERROR]({ commit }) {
    commit(AppMutationType.CLEAR_ERROR);
  },
  async [ActionAppTypes.SET_EDITING]({ commit }) {
    commit(AppMutationType.SET_EDITING);
  },
  async [ActionAppTypes.CANCEL_EDITING]({ commit }) {
    commit(AppMutationType.CANCEL_EDITING);
  },
  async [ActionAppTypes.SET_CREATING]({ commit }) {
    commit(AppMutationType.SET_CREATING);
  },
  async [ActionAppTypes.CANCEL_CREATING]({ commit }) {
    commit(AppMutationType.CANCEL_CREATING);
  },
  async [ActionAppTypes.SET_HOME]({ commit }) {
    commit(AppMutationType.SET_HOME);
  },
  async [ActionAppTypes.SET_CLONING]({ commit }) {
    commit(AppMutationType.SET_CLONING);
  },
  async [ActionAppTypes.CANCEL_CLONING]({ commit }) {
    commit(AppMutationType.CANCEL_CLONING);
  },
};
