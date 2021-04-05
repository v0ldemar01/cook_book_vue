import { AppMutations, appMutations } from "./appMutations";
import { RecipeMutations, recipeMutations } from "./recipeMutations";

export type Mutations = AppMutations & RecipeMutations;

export const mutations: Mutations = {
  ...appMutations,
  ...recipeMutations,
};
