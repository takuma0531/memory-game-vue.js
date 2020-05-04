import Vue from 'vue';
import VueRouter from 'vue-router';

import SettingField from '../views/SettingField.vue';
import PlayField from '../views/PlayField.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SettingField',
    component: SettingField,
  },
  {
    path: '/play-field',
    name: 'PlayField',
    component: PlayField,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/play-field') {
    if (!store.state.accessAuth) {
      next('/');
    }
  }
  next();
});

export default router;
