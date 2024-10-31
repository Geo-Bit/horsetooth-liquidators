import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Checkout from '../views/Checkout.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import JobPosting from '../views/JobPosting.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/products/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: About },
  { path: '/careers/security-specialist', name: 'JobPosting', component: JobPosting },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;