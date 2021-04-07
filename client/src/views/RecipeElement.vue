<template>
  <div>
    <div class="d-flex justify-content-around container-element">
      <div class="col-6 col-wrap-elem">
        <h2 style="text-align: center">Recipe add form</h2>
        <div class="card">
          <div class="card-body card-body-wrap">
            <form>
              <div class="form-group">
                <label class="add-margin" for="nameFormControlInput0"
                  >Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nameFormControlInput0"
                  placeholder="Please enter name"
                  v-model.lazy="newRecipe.name"
                />
              </div>
              <div class="form-group form-group-margin">
                <label class="add-margin" for="stepsFormControlTextarea0"
                  >Steps</label
                >
                <textarea
                  class="form-control"
                  id="stepsFormControlTextarea0"
                  rows="3"
                  v-model.lazy="newRecipe.steps"
                ></textarea>
              </div>
              <div class="form-group form-group-margin">
                <label class="add-margin" for="exampleFormControlInput1"
                  >Image url</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Please enter image url"
                  v-model.lazy="newRecipe.imageURL"
                />
              </div>
              <ul class="ingredient-cards add-margin">
                <li
                  v-for="ingredient in newRecipe.ingredients"
                  :key="ingredient.id"
                >
                  <div class="card" style="width: 13rem">
                    <span
                      class="pull-right"
                      data-effect="fadeOut"
                      @click="deleteIngredient(ingredient.name)"
                    >
                      <i class="bi-trash"></i>
                    </span>
                    <div class="card-body">
                      <h5 class="card-title">Name - {{ ingredient.name }}</h5>
                      <p class="card-text">Type - {{ ingredient.type }}</p>
                      <p class="card-text">
                        Quantity - {{ ingredient.quantity }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
            <div
              class="btn-wrapper text-center d-flex justify-content-around align-items-center h-100"
            >
              <button class="btn btn-danger" @click="resetRecipeForm">
                Cancel
              </button>
              <button
                class="btn btn-success"
                :disabled="!validRecipe"
                @click="recipeAction"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 col-wrap-elem">
        <h2 style="text-align: center">Ingredient add form</h2>
        <div class="card">
          <div class="card-body">
            <form>
              <div class="form-group form-group-margin">
                <label class="add-margin" for="nameFormControlInput"
                  >Name</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nameFormControlInput"
                  placeholder="Please enter name"
                  v-model.lazy="newIngredient.name"
                />
              </div>
              <div class="form-group form-group-margin">
                <label class="add-margin" for="typeFormControlInput"
                  >Type</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="typeFormControlInput"
                  placeholder="Please enter type"
                  v-model.lazy="newIngredient.type"
                />
              </div>
              <div class="form-group form-group-margin">
                <label class="add-margin" for="quantityFormControlInput"
                  >Quantity</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="quantityFormControlInput"
                  placeholder="Please enter quantity"
                  v-model.lazy="newIngredient.quantity"
                />
              </div>
            </form>
            <div
              class="btn-wrapper text-center d-flex justify-content-around align-items-center h-100"
            >
              <button class="btn btn-danger" @click="resetIngredientForm">
                Clear
              </button>
              <button
                class="btn btn-success"
                @click="addIngredient"
                :disabled="!validIngredient"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from "vue";
import { IIngredient } from "../common/models/ingredient";
import { IRecipe } from "../common/models/recipe";
import { useStore } from "../store";
import { ActionAppTypes } from "../store/actions/types/appTypes";
import { ActionRecipeTypes } from "../store/actions/types/recipeTypes";

export default defineComponent({
  name: "RecipeElement",
  setup() {
    onMounted(() => store.dispatch(ActionAppTypes.SET_CREATING));
    const store = useStore();
    const currentRecipe = computed(() => store.getters.currentRecipe);
    const cloningRecipe = computed(() => store.getters.cloningRecipe);
    const isEditing = computed(() => store.getters.isEditing);
    const newRecipe = isEditing.value
      ? currentRecipe.value
      : reactive({
          name: "",
          steps: "",
          imageURL: "",
          ingredients: [],
        } as IRecipe);
    const newIngredient = reactive({
      quantity: "",
      name: "",
      type: "",
    } as IIngredient);
    const resetRecipeForm = () => {
      newRecipe.name = "";
      newRecipe.steps = "";
      newRecipe.imageURL = "";
      newRecipe.ingredients = [];
    };
    const resetIngredientForm = () => {
      newIngredient.quantity = "";
      newIngredient.name = "";
      newIngredient.type = "";
    };
    const addIngredient = () => {
      newRecipe.ingredients.push({ ...newIngredient });
      resetIngredientForm();
    };
    const deleteIngredient = (name: string) => {
      newRecipe.ingredients = newRecipe.ingredients.filter(
        (ingredient) => ingredient.name !== name
      );
    };
    const recipeAction = () => {
      if (isEditing.value) {
        store.dispatch(ActionRecipeTypes.UPDATE_RECIPE, newRecipe);
      } else {
        store.dispatch(ActionRecipeTypes.ADD_RECIPE, {
          ...newRecipe,
          parentId: cloningRecipe.value.id,
        });
      }
      resetRecipeForm();
    };
    const valid = (form: IRecipe | IIngredient) =>
      Object.values(form).filter((e) =>
        e && typeof e === "string" ? e.trim() : null
      ).length;
    const validIngredient = computed(() => valid(newIngredient));
    const validRecipe = computed(() => valid(newRecipe));

    return {
      resetRecipeForm,
      resetIngredientForm,
      validIngredient,
      validRecipe,
      addIngredient,
      deleteIngredient,
      recipeAction,
      newIngredient,
      newRecipe,
      currentRecipe,
      isEditing,
    };
  },
});
</script>
<style lang="scss" scoped>
.container-element-create {
  height: 92vh;
}
.container-element {
  padding: 50px 0;
  flex-wrap: wrap;
}
.col-wrap-elem {
  min-width: 40%;
}
@media (max-width: 880px) {
  .col-wrap-elem {
    min-width: 70%;
    margin-bottom: 40px;
    margin-top: -20px;
  }
}
.form-group-margin {
  margin: 1rem auto;
}
.add-margin {
  margin-bottom: 0.5rem !important;
}
.card-title {
  margin-bottom: 1rem;
}
.pull-right {
  position: absolute;
  right: 5px;
}
.ingredient-cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  grid-gap: 20px;
  margin: 0;
  padding: 0;
}
.bi-trash:hover {
  color: #830d5f;
}
</style>
