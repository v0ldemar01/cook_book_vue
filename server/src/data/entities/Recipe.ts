import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Ingredient } from './Ingredient';

@Entity()
export class Recipe extends AbstractEntity {
  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {
    cascade: true
  })
  ingredients: Ingredient[];

  @Column()
  steps: string;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ nullable: true })
  prevId: string;

  @Column({ nullable: true })
  nextId: string;
}
