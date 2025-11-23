import { createRouter, createWebHistory } from 'vue-router';
import CaseSearchView from '../views/CaseSearchView.vue';
import CaseDetailView from '../views/CaseDetailView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: CaseSearchView
    },
    {
      path: '/cases/:id',
      name: 'case-detail',
      component: CaseDetailView,
      props: true
    }
  ]
});

export default router;
