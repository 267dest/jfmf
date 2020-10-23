import VueRouter from "vue-router";

import Login from '../views/Login.vue';
import List from '../views/List.vue';


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List
  }
]

export default new VueRouter({
    mode: 'history',
    routes
})
