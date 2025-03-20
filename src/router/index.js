import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import CartItem from '../components/CartItem.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/cart', component: CartItem },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;