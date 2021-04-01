import { Router } from 'express';
import { run } from '../../common/helpers/routeHelper';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../../services/recipeService';

const router = Router();

router
  .get('/', run(req => getRecipes(req.query)))
  .get('/:id', run(req => getRecipeById(req.params.id)))
  .post('/', run(req => addRecipe(req.body)))
  .put('/:id', run(req => updateRecipe(req.params.id, req.body)))
  .delete('/:id', run(req => deleteRecipe(req.params.id)));

export default router;
