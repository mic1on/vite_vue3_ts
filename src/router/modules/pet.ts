const MainLayout = () => import('@/layouts/MainLayout.vue')
export default [
  {
    path: '/pet',
    component: MainLayout,
    name: 'Pet',
    meta: {
      hidden: false,
      icon: 'fa-solid:crow',
    },
    children: [
      {
        path: 'cat',
        meta: {
          icon: 'fa-solid:cat',
          transition: 'zoom-fade',
        },
        name: 'PetCat',
        component: () => import('@/views/pet/cat/index.vue'),
      },
      {
        path: 'dog',
        meta: {
          icon: 'fa-solid:dog',
          transition: 'zoom-fade',
        },
        name: 'PetDog',
        component: () => import('@/views/pet/Dog.vue'),
      },
    ],
  },
]
