import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'

import tab1 from './modules/tab1'
import tab2 from './modules/tab2'
import tab3 from './modules/tab3'

Vue.use(Vuex)

const middlewares = []

if (__DEV__) {
  middlewares.push(createLogger())
}

const store = new Vuex.Store({
  modules: {
    tab1,
    tab2,
    tab3
  },
  middlewares
})

export default store

if (module.hot) {
  module.hot.accept([
    './modules/tab1',
    './modules/tab2',
    './modules/tab3'
  ], () => {
    try {
      store.hotUpdate({
        modules: {
          tab1: require('./modules/tab1').default,
          tab2: require('./modules/tab2').default,
          tab3: require('./modules/tab3').default
        }
      })
    } catch (e) {
      console.log(e.stack)
    }
  })
}
