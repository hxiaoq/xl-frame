import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// 全局注册组件。使用时只需引入<svg-icon :icon-class="svg文件名">即可
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
