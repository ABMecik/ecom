import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Favorites from '../views/Favorites.vue'


import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id/',
    name: 'Product',
    component: Product
  },
  {
    path: '/categories/:id/',
    name: 'Category',
    component: Category
  },
  {
    path: '/search/:query/',
    name: 'Search',
    component: Search
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
    meta: {
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next({name:'Login', query:{to: to.path}})
  }else{
    next();
  }
});

export default router
