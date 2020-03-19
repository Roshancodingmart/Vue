import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from "vue-resource"
var otpGenerator = require('otp-generator')
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue(
  // console.log(router),
  {
  router,
  otpGenerator,
  render: h => h(App),
}).$mount('#app')
