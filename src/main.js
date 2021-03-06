import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./http";
import axios from "axios";
import Vant from 'vant';
import 'vant/lib/index.css';
import FastClick from 'fastclick'
import momunt from "dayjs"
// import 'lib-flexible'
// import BScroll from 'better-scroll'
FastClick.attach(document.body);
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.$momunt=momunt
Vue.prototype.$axios = http;
// 处理响应超时时间
axios.defaults.timeout = 100000;
// 设置post请求的响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 设置响应拦截
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
