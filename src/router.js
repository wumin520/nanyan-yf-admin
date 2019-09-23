import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Admin from "./layout/admin.vue";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";

import UserList from "./views/user/list";
import UserAdd from "./views/user/add";
import User from "./views/user/index";
import RoleList from "./views/role/list";
import RoleAdd from "./views/role/add";
import Role from "./views/role/index";

import AdminMenuList from "./views/admin_menu/list";
import AdminMenuAdd from "./views/admin_menu/add";
import AdminMenu from "./views/admin_menu/index";

import BxOrderList from "./views/bx_order/list";
import BxOrderAdd from "./views/bx_order/add_or_update";
import BxOrder from "./views/bx_order/index";



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      // component: Home,
      redirect: { name: "login" }
    },
    {
      path: "/",
      // name: "dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
          meta: {
            breadcrumbName: "权限管理"
          }
        },
        {
          path: "list",
          name: "list",
          component: Dashboard,
          meta: {
            breadcrumbName: "理赔查询"
          }
        },
        {
          path: "user",
          name: "user",
          component: User,
          meta: {
            breadcrumbName: "用户管理"
          },
          children: [{
            path: "add",
            name: "user_add",
            component: UserAdd,
            meta: {
              breadcrumbName: "新增"
            },
          },{
            path: "list",
            name: "user_list",
            component: UserList,
            meta: {
              breadcrumbName: "列表"
            },
          },]
        },
        {
          path: "role",
          name: "role",
          component: Role,
          meta: {
            breadcrumbName: "角色管理"
          },
          children: [{
            path: "add",
            name: "role_add",
            component: RoleAdd,
            meta: {
              breadcrumbName: "新增"
            },
          },{
            path: "list",
            name: "role_list",
            component: RoleList,
            meta: {
              breadcrumbName: "列表"
            },
          },]
        },
        {
          path: "adminMenu",
          name: "admin_menu",
          component: AdminMenu,
          meta: {
            breadcrumbName: "菜单管理"
          },
          children: [{
            path: "add",
            name: "admin_menu_add",
            component: AdminMenuAdd,
            meta: {
              breadcrumbName: "新增"
            },
          },{
            path: "list",
            name: "admin_menu_list",
            component: AdminMenuList,
            meta: {
              breadcrumbName: "列表"
            },
          },]
        },
        {
          path: "bxOrder",
          name: "bx_order",
          component: BxOrder,
          meta: {
            breadcrumbName: "保单管理"
          },
          children: [{
            path: "add",
            name: "bx_order_add",
            component: BxOrderAdd,
            meta: {
              breadcrumbName: "新增"
            },
          },{
            path: "list",
            name: "bx_order_list",
            component: BxOrderList,
            meta: {
              breadcrumbName: "列表"
            },
          },]
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
