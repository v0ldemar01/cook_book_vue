import { GetterTree } from 'vuex';
import { IAppState } from '../state/appState';

export type AppGetters = {
  loading: (state: IAppState) => boolean,
  error: (state: IAppState) => string,
  isCreating: (state: IAppState) => boolean,
  isEditing: (state: IAppState) => boolean,
}

export const appGetters: GetterTree<IAppState, IAppState> & AppGetters = {
  loading: (state: IAppState) => state.loading,
  error: (state: IAppState) => state.error,
  isCreating: (state: IAppState) => state.isCreating,
  isEditing: (state: IAppState) => state.isEditing,
}  