// import path from 'path'
import { createRouter, createWebHistory } from 'vue-router'

const routerDesktop = [
    {
      path: '/',
      component: () => import('../views/SideView.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../components/Dashboard.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('../components/Product/Product.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../components/UserManage.vue')
        },
        {
          path: '/productadd',
          name: 'productadd',
          component: () => import('../components/Product/ProductAdd.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../components/Order/Order.vue')
        },
        {
          path: '/orderdetails/:id',
          name: 'orderdetail',
          component: () => import('../components/Order/OrderDetails.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]

const routerMobile = [
    {
      path: '/',
      component: () => import('../mobile/views/NavigatorView.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../components/Dashboard.vue')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('../components/Product/Product.vue')
        },
        {
          path: '/productdetails/:id',
          name: 'productdetails',
          component: () => import('../components/Product/ProductDetails.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../components/UserManage.vue')
        },
        {
          path: '/productadd',
          name: 'productadd',
          component: () => import('../components/Product/ProductAdd.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../components/Order/Order.vue')
        },
        {
          path: '/orderdetails/:id',
          name: 'orderdetail',
          component: () => import('../components/Order/OrderDetails.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../components/Setting.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    }
]

var routes = routerDesktop
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  routes = routerMobile
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

import axios from 'axios';
// axios.defaults.withCredentials = true;
function getCsrfToken() {
  return document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
}
axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();
// router.beforeEach((to, from, next) => {
//   console.log(to.path)
//   if (to.path !== '/login' && to.path !== '/register') {
//     axios.get('http://localhost:8000/management/check-session/', {
//       withCredentials: true,
//     })
//       .then(response => {
//         console.log("check-session response: ", response, "to:", to.path, "from:", from.path, "next:)");
//         if (response.data.isAuthenticated) {
//           console.log("User is authenticated, proceeding to:", to.path);
//           next();
//         } else {
//           next('/login');
//         }
//       })
//       .catch(() => {
//         next('/login');
//       });
//   } else {
//     next();
//   }
// });

export default router
