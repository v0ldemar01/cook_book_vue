import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Recipe } from './Recipe';

@Entity()
export class Ingredient extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column()
  type: string;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipe, {
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}
