import Store from '../store/index.js';

const routes = [
  {
    path: '/',
    component: () => import('src/layouts/home/layout.vue'),
    beforeEnter: (to, from, next) => {
      if (Store().getters['auth/getToken'] == '') {
        next('/auth/')
      }      
      else {
        next()
      }
    },

    children: [
      { path: '', component: () => import('pages/home/home.vue') },
      {
        path: 'settings', component: () => import('pages/settings/settings.vue'),
        children: [
          { path: '', redirect:{name:"users"} },
          { path: 'users', name:"users", component: () => import('pages/settings/users/users.vue') },
          { path: 'roles', component: () => import('pages/settings/roles/roles.vue') },
          { path: 'configurations', component: () => import('pages/settings/configurations/configurations.vue') }
        ]
      },
      {
        path: 'products', component: () => import('pages/products/products.vue'),
        children: [
          { path: '', component: () => import('pages/products/suppliers.vue') },
          { path: 'subscriptions', component: () => import('pages/products/subscriptions.vue') }]
      },
      { path: 'profile', component: () => import('pages/profile/profile.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('src/layouts/auth/auth.vue'),
    children: [
      { path: '', component: () => import('src/pages/auth/auth.vue') },
      { path: 'forgot', component: () => import('src/pages/auth/forgot.vue') }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
