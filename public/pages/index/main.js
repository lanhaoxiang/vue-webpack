import { configRouter } from './route-config'
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// create router
const router = new VueRouter({
  history:true,
  linkActiveClass:'active',
  saveScrollPosition: true
})

configRouter(router);

const App = Vue.extend(require('./App.vue'))
router.start(App, '#app');


