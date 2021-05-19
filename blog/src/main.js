import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
