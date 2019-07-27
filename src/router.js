import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router= new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
        meta:{
            show:true
        }
    },
    {
      path: "/details",
      name: "details",
      component: () =>
        import("./views/Details.vue"),
        meta:{
          show:false
        }
    },
    {
      path: "/classification",
      name: "classification",
      component: () =>
          import("./views/Classification.vue"),
        meta:{
            show:true
        }
    },
      {
          path: "/person",
          name: "person",
          component: () =>
              import("./views/Person.vue"),
          meta:{
              show:true
          }
      },
      {
          path: "/login",
          name: "login",
          component: () =>
              import("./views/Login.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/cart",
          name: "cart",
          component: () =>
              import("./views/Cart.vue"),
          meta:{
              show:true
          }
      },{
          path: "/collect",
          name: "collect",
          component: () =>
              import("./views/Collect.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/browse",
          name: "browse",
          component: () =>
              import("./views/Browse.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/personal",
          name: "personal",
          component: () =>
              import("./views/Personal.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/order",
          name: "order",
          component: () =>
              import("./views/Order.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/address",
          name: "address",
          component: () =>
              import("./views/Address.vue"),
          meta:{
              show:false
          }
      },
      {
          path: "/edit",
          name: "edit",
          component: () =>
              import("./views/Edit.vue"),
          meta:{
              show:false
          }
      }
  ],
});
// router.beforeEach((to, from, next) => {
//     let user = localStorage.getItem('user')
//     if (to.path === '/login') {
//         next()
//     } else {
//         if(user){
//             next()
//         }else {
//             next('/login')
//         }
//     }
// })
export default router