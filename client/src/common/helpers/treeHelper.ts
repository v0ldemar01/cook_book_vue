import { IRecipe } from "../models/recipe";
import { ITreeNode } from "../models/recipe/tree";

export const toTree = (recipes: IRecipe[]) => {
  const resultTree = [] as ITreeNode[];

  const sortedRecipes = [
    ...recipes.filter((recipe) => !recipe.parentId),
    ...recipes.filter((recipe) => recipe.parentId),
  ]
    .filter((recipe) => !recipe.nextId)
    .sort((a: IRecipe, b: IRecipe) =>
      (a.createdAt as string) > (b.createdAt as string)
        ? 1
        : (a.createdAt as string) < (b.createdAt as string)
        ? -1
        : 0
    );
  sortedRecipes.forEach((recipe) => {
    let recipeInTree = {} as ITreeNode;
    if (recipe.parentId) {
      const parentRecipe = recipes.find(
        (currentRecipe) => currentRecipe.id === recipe.parentId
      );
      if (!parentRecipe) return;

      resultTree.some(
        (currentRecipeTree) =>
          (recipeInTree = getById(
            currentRecipeTree,
            parentRecipe.id as string
          ) as ITreeNode)
      );

      if (!recipeInTree) return;

      if (!recipeInTree.nodes || !Array.isArray(recipeInTree.nodes))
        recipeInTree.nodes = [];
      recipeInTree.nodes.push({
        text: recipe.name,
        id: recipe.id,
        checkable: false,
        selected: false,
        expanded: false,
      } as ITreeNode);
    } else {
      resultTree.push({
        text: recipe.name,
        id: recipe.id,
        checkable: false,
        selected: false,
        expanded: false,
      } as ITreeNode);
    }
  });
  return resultTree.sort((a: ITreeNode, b: ITreeNode) =>
    (a.text as string) > (b.text as string)
      ? 1
      : (a.text as string) < (b.text as string)
      ? -1
      : 0
  );
};

const getById = (tree: ITreeNode, id: string) => {
  let result;
  if (tree.id === id) {
    return tree;
  } else {
    if (tree.nodes) {
      tree.nodes.some((node) => (result = getById(node, id)));
    }
    return result;
  }
};
