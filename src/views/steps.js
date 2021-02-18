const tabMp4Url = require('../assets/video/tab.mp4')
const splitMp4Url = require('../assets/video/split.mp4')
const tabHtml = `<p>任意拖动改变标签顺序，且支持鼠标右键扩展功能</p><div class="drive-video"><video src=${tabMp4Url} loop mute autoplay controls="controls"></div>`
const splitHtml = `<p>鼠标左键按住此处向左拖动后，可直接将页面标签拖拽到空白区域对比</p><div class="drive-video"><video src=${splitMp4Url} loop mute autoplay controls="controls"></div>`
const steps = [
  {
    element: '#system-name-title',
    nextBtnText: '开始吧',
    stageBackground: 'transparent',
    popover: {
      title: '欢迎来到新的系统',
      description: '在开始使用前，让我们为您先简单介绍下系统的新特性，准备好了吗?',
      position: 'bottom-center'
    }
  },
  {
    element: '#hamburger-container',
    onHighlighted(element) {
      element.stage.node.classList.add('collapse-border')
    },
    onDeselected(element) {
      element.stage.node.classList.remove('collapse-border')
    },
    popover: {
      title: '切换菜单显示模式',
      description: '点击此处展开收起菜单',
      position: 'bottom'
    }
  },
  {
    element: '.router-tab__scroll-container',
    popover: {
      className: 'video-popover-class',
      title: '操作已打开的页面标签',
      description: tabHtml,
      position: 'bottom'
    }
  },
  {
    element: '#toggle-full-screen',
    popover: {
      title: '全屏操作按钮',
      description: '点击设置当前内容区最大化',
      position: 'left'
    },
    padding: 5
  },
  {
    element: '.gutter-horizontal',
    popover: {
      className: 'video-popover-class',
      title: '分区对比拖动条',
      description: splitHtml,
      position: 'left'
    }
  },
  {
    element: '#header-other-content',
    onHighlightStarted(element) {
      element.node.classList.add('driver-text')
    },
    onDeselected(element) {
      element.node.classList.remove('driver-text')
      // 已经引导结束
      window.localStorage.setItem('hasDrived', '1')
    },
    popover: {
      title: '个人/系统操作区域',
      description: '点击此处下拉选择系统/个人配置项',
      position: 'left'
    }
  }
]

export default steps
