import VueRouter from "vue-router";

import Login from '../views/Login.vue';
import List from '../views/List.vue';
import InvenLog from '../views/InvenLog.vue';
import MemberManage from '../views/MemberManage.vue';


const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
      path: '/list',
      name: 'List',
      component: List,
      meta: {
        requiresAuth: true
      }
  },{
    path: '/invenlog',
    name: 'InventoryLog',
    component: InvenLog,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/member',
    name: 'MemberManagement',
    component: MemberManage,
    meta: {
      requiresAuth: true
    }
  },
]


export default new VueRouter({
    mode: 'history',
    routes
})
