import Vue from 'vue';
import VueRouter from 'vue-router';
import SettingField from '../views/SettingField.vue';
import PlayField from '../views/PlayField.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SettingField',
    component: SettingField,
  },
  {
    path: '/',
    name: 'PlayField',
    component: PlayField,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
