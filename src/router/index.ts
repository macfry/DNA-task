import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import TransactionView from '@/views/transactions/TransactionsView.vue';
import TransactionDetailsView from '@/views/transactions/TransactionDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home'
      },
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionView,
      meta: {
        title: 'Transactions Overview'
      },
    },
    {
      path: '/transactions/:id',
      name: 'transactions/details',
      component: TransactionDetailsView,
      meta: {
        title: 'Transaction Details'
      },
    }
  ]
})

export default router
