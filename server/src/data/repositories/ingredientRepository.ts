import { EntityRepository, Repository } from 'typeorm';
import { Ingredient } from '../entities/Ingredient';
import { IIngredient } from '../../common/models/ingredient';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
  addIngredient(ingredient: IIngredient): Promise<Ingredient> {
    return this.create(ingredient).save();
  }

  getIngredientById(id: string): Promise<Ingredient> {
    return this.findOne({ where: { id } });
  }

  getIngredients(name: string | null): Promise<Ingredient[]> {
    return this.find({ where: { name } });
  }

  getIngredientByName(name: string): Promise<Ingredient> {
    return this.findOne({ where: { name } });
  }

  async updateIngredient(id: string, data: Partial<Ingredient>): Promise<Ingredient> {
    await this.update(id, data);
    return this.getIngredientById(id);
  }

  async deleteIngredient(id: string): Promise<Ingredient> {
    const recipe = await this.getIngredientById(id);
    return this.remove(recipe);
  }
}
