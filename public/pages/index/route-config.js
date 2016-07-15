export function configRouter (router) {
  router.hashbang=true;
  // normal routes
  router.map({
    '/tab1': {
      name:'tab1',
      component: require('./components/Tab1.vue')
    },

    '/tab2':{
      name:'tab2',
      component: require('./components/Tab2.vue')
    },

    '/tab3':{
      name:'tab3',
      component: require('./components/Tab3.vue')
    },

    '*': {
      name:'not-found',
      component: require('./components/not-found.vue')
    }
  })

  router.redirect({
    '/':'/tab1'
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true
      setTimeout(() => {
        router.app.authenticating = false
        alert('this route is forbidden by a global before hook')
        transition.abort()
      }, 3000)
    } else {
      $.init();
      transition.next()
    }
  })
}
