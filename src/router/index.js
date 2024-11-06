import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store-init';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Checkout from '../views/Checkout.vue';
import Cart from '../views/Cart.vue';
import About from '../views/About.vue';
import JobPosting from '../views/JobPosting.vue';
import UserProfile from '../views/UserProfile.vue';
import NotFound from '../views/NotFound.vue'
import UserInbox from '@/views/UserInbox.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'ProductList', component: ProductList },
  { path: '/products/:id', name: 'ProductDetails', component: ProductDetails },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/about', name: 'About', component: About },
  { path: '/careers/security-specialist', name: 'JobPosting', component: JobPosting },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
  { path: '/inbox', name: 'inbox', component: UserInbox, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('Checking auth state:', store.getters['auth/isAuthenticated'])
    
    if (!store.getters['auth/isAuthenticated']) {
      next({ 
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;