<template>
  <xl-container>
    <xl-header>
      <header-content />
    </xl-header>
    <xl-container>
      <xl-aside :width="toggleWidth" class="collapse-transition">
        <div :style="{width: toggleWidth, position: 'relative', height: '100%' }" class="collapse-transition">
          <xl-menu :default-active="currentIndex" :collapse="isCollapse" :collapse-transition="false">
            <recursion-menu :menu-list="menuListWithPre" />
          </xl-menu>
          <div v-show="!isFullScreen" class="left-collapse-icon" @click="toggleMenu">
            <div id="hamburger-container" class="icon">
              <svg-icon :icon-class="isCollapse?'arrow-right':'arrow-left'" />
            </div>
          </div>
        </div>

      </xl-aside>
      <xl-main
        v-loading="loading"
        element-loading-text="系统加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <router-tab :class="{'is-fullscreen': isFullScreen}" @iframe-mounted="iframeMounted" @iframe-loaded="iframeLoaded">
          <!-- 页签结束 -->
          <template #end>
            <div class="toggle-icon" @click="toggleScreen">
              <div id="toggle-full-screen" class="icon">
                <svg-icon :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'" />
              </div>
            </div>
          </template>
        </router-tab>
      </xl-main>
    </xl-container>
  </xl-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventTypes } from 'xl-utils'
import { pushPath, makeFullUrl } from '@/assets/js/utils'
import recursionMenu from '@/components/recursionMenu/index'
import headerContent from '@/components/headerContent/index'
import { showTokenExpireBox } from '@/assets/js/utils'
import '@/assets/css/index.scss'
// 引入引导页
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps'

export default {
  components: {
    recursionMenu,
    headerContent
  },
  data() {
    return {
      loading: false,
      isFullScreen: false,
      isCollapse: false,
      driver: null
    }
  },
  computed: {
    ...mapGetters(['firstIframeId', 'menuListWithPre']),
    toggleWidth() {
      return this.isCollapse ? '65px' : '230px'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query || {}
        this.currentIndex = query.id || this.firstIframeId
      },
      immediate: true
    }
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleEvent)
  },
  mounted() {
    window.addEventListener('message', this.handleEvent)
    // 处理 引导页
    if (!window.localStorage.getItem('hasDrived')) {
      this.showDrivers()
    }
  },
  methods: {
    showDrivers() {
      this.driver = new Driver({
        padding: 0,
        allowClose: false,
        doneBtnText: '完成',
        closeBtnText: '关闭',
        prevBtnText: '上一个',
        nextBtnText: '下一个'
      })
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    toggleScreen() {
      this.isFullScreen = !this.isFullScreen
    },
    // iframe 节点挂载就绪
    iframeMounted(url, iframe) {
      this.loading = true
    },

    // iframe 内容加载成功
    iframeLoaded() {
      this.loading = false
    },
    handleEvent(e) {
      // sysCode为了兼容老系统字段 后期不用可以去掉
      const eventType = e?.data?.eventType || e?.data?.sysCode
      // 只处理子系统发过来的有eventsType的事件
      if (eventType) {
        switch (eventType) {
          case eventTypes.timeOut:
            showTokenExpireBox()
            break
          case eventTypes.newTab:
            this.openNewTab(e.data)
            break

          default:
            break
        }
      }
    },
    openNewTab(data) {
      const sysURLWithPre = makeFullUrl({
        sysCode: data.sysCode,
        resPath: data.resPath,
        id: data.id,
        resId: data.resId
      })
      const pageConfig = {
        sysURLWithPre: sysURLWithPre,
        resName: data.resName || '',
        icon: data.icon || '',
        id: data.id || ''
      }
      pushPath(pageConfig)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/variables.scss';
.el-menu--collapse > div > .el-menu-item > span,  .el-menu--collapse > div > .el-submenu > .el-submenu__title > span, .el-menu--collapse > div > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow{
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.collapse-transition {
  transition: width .3s;
}
.el-menu {
  border-right: none;
}
.router-tab.is-fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #fff;
}
.el-main {
  box-shadow: 0px 3px 6px 0px $shadowColor;
  padding:0;
}
//引导页的class
div#driver-highlighted-element-stage.collapse-border {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
div#driver-popover-item.video-popover-class {
  max-width: 1000px;
  width: 600px;
}
.drive-video {
  width: 600px;
  height: auto;
  margin-top: 5px;
  video {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.toggle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30px;
  font-size: 19px;
  cursor: pointer;
  padding-right: 15px;
}
</style>
