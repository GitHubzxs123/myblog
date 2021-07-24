import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import axios from 'axios'
import './assets/icon/iconfont.css'
import instance from './http/http';

Vue.config.productionTip = false
Vue.use(instance);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
