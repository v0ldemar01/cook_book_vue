import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import RecipeElement from "../views/RecipeElement.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create recipe",
    component: RecipeElement,
  },
  {
    path: "/clone",
    name: "Clone recipe",
    component: RecipeElement,
  },
  {
    path: "/edit/:id",
    name: "Edit recipe",
    component: RecipeElement,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
