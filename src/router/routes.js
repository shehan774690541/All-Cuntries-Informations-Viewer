const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/AllData.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue')
    }
  },
  {
    path: '/data',
    name: 'data',
    component: function () {
      return import('../components/dataView.vue')
    }
  }
]

export default routes