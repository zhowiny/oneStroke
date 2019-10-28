import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/game',
      name: 'game',
      component: () => import('./views/game.vue')
    },
    {
      path: '/',
      name: 'rule',
      component: () => import('./views/rule.vue')
    },
  ]
})
