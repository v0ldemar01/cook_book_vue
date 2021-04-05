export interface IAppState {
  loading: boolean;
  isEditing: boolean;
  isCreating: boolean;
  isCloning: boolean;
  error: string;
}

export const appState: IAppState = {
  loading: false,
  error: "",
  isEditing: false,
  isCreating: false,
  isCloning: false,
};
