// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router';
import ProductDetails from '@/pages/product-details/[id].vue';

const routes = [
  {
    path: '/product-details/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
];

const router = createRouter ({
  history: createWebHistory (),
  routes,
});

export default router;
