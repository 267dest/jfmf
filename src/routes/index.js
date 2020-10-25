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
      component: List
  },{
    path: '/invenlog',
    name: 'InventoryLog',
    component: InvenLog
  },
  {
    path: '/member',
    name: 'MemberManagement',
    component: MemberManage
  }
]

export default new VueRouter({
    mode: 'history',
    routes
})
