import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from '../entities/Recipe';
import { IRecipe } from '../../common/models/recipe';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  addRecipe(recipe: IRecipe): Promise<Recipe> {
    return this.create(recipe).save();
  }

  getRecipeById(id: string, short?: boolean): Promise<Recipe> {
    const extension = short ? {} : { relations: ['ingredients'] };
    return this.findOne({ where: { id }, ...extension });
  }

  getRecipes(name?: string): Promise<Recipe[]> {
    const condition = name ? { where: { name } } : {};
    return this.find({ ...condition, relations: ['ingredients'] });
  }

  getRecipeByName(name: string): Promise<Recipe> {
    return this.findOne({ where: { name }, relations: ['ingredients'] });
  }

  async updateRecipe(id: string, data: Partial<IRecipe>): Promise<Recipe> {
    await this.update(id, data);
    return this.getRecipeById(id);
  }

  async deleteRecipe(id: string): Promise<Recipe> {
    const recipe = await this.getRecipeById(id, true);
    return this.remove(recipe);
  }
}
