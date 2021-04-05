import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { state, State } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
});

export const useStore = () => baseUseStore(key);
