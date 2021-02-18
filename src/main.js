import Vue from 'vue'
import App from './App.vue'
import XlViews from 'xl-views'
import 'xl-views/dist/xl-views.css'

import 'xl-utils/src/css/reset.css'

// 引入xl-vue-router-tab组件和样式
import RouterTab from 'xl-vue-router-tab'
import 'xl-vue-router-tab/dist/lib/xl-vue-router-tab.css'

import router from './router'
import store from './store'

import './icons' // icon
import './router/permission' // router perssion

Vue.use(XlViews)
Vue.use(RouterTab)

Vue.config.productionTip = false

window.App = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
