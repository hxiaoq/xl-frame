<template>
  <div class="header-content">

    <div id="system-name-title" class="title">
      <div class="logo"><img width="30px" height="30px" src="@/assets/images/logo.png"></div>
      <div>江苏省生态环境厅污染治理设施用电状况监管云平台</div>
    </div>
    <div id="header-other-content" class="other">
      <div class="avatar-img">
        <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
      </div>
      <xl-dropdown class="dropdown-wrapper" trigger="click">
        <div class="avatar-wrapper">
          <div class="avatar-name">
            <span>{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
        </div>
        <xl-dropdown-menu slot="dropdown">
          <xl-dropdown-item @click.native="logout">
            <span>退出</span>
          </xl-dropdown-item>
        </xl-dropdown-menu>
      </xl-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    avatar() {
      return this.$store.getters.avatar
    },
    name() {
      return this.$store.getters.name
    }
  },
  created() {
    this.$store.dispatch('user/getInfo')
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.header-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: normal;
    color: $headerTitleTextColor;
  }
  .other {
      display: flex;
      align-items: center;
      &.driver-text .avatar-wrapper .avatar-name{
        color: #606266;
      }
      .avatar-img {
          display: block;
          width: 26px;
          height: 26px;
          border-radius: 14px;
          border: 1px solid $headerImgBorderColor;
          img {
              display: block;
              height: 100%;
              width: 100%;
          }
      }
      .dropdown-wrapper {
        cursor: pointer;
      }
      .avatar-wrapper {
        .avatar-name {
            padding-left: 8px;
            font-size: 14px;
            color: $headerNameColor;
            span {
              padding-right: 3px
            }
        }
    }
  }
}

</style>
