const MainLayout = () => import('@/layouts/MainLayout.vue')
export default [
  {
    path: '/',
    component: MainLayout,
    redirect: { name: 'Home' },
    name: 'Index',
    meta: {
      icon: 'fa-solid:home',
    },
    children: [
      {
        path: 'home',
        meta: {
          icon: 'fa-solid:home',
          transition: 'fade-slide',
          affix: true,
        },
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
  //这些都在目录里隐藏
  {
    path: '/uc',
    component: MainLayout,
    name: 'UserCenter',
    meta: {
      icon: 'fa-solid:id-card',
      hidden: true,
    },
    children: [
      {
        path: '/uc/profile',
        name: 'UserProfile',
        meta: {
          icon: 'fa-solid:id-card',
          transition: 'zoom-fade',
          hidden: true,
        },
        component: () => import('@/views/base/profile/index.vue'),
      },
    ],
  },
]
