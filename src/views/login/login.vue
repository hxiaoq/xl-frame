<template>
  <div class="login">
    <header>
      <div class="register">注册</div>
      <div class="forget-password">忘记密码</div>
    </header>
    <main>
      <h3>江苏省生态环境厅污染治理设施用电状况监管云平台</h3>
      <xl-form ref="form" :model="condition" :rules="rules" class="login-form">
        <xl-form-item prop="userName">
          <xl-input
            v-model="condition.userName"
            type="text"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </xl-form-item>
        <xl-form-item prop="password">
          <xl-input
            v-model="condition.password"
            show-password
            valid-caps-lock
            caps-message="大写已锁定"
            placeholder="请输入用户密码"
            prefix-icon="el-icon-ios-unlock-outline"
          />
        </xl-form-item>
        <xl-form-item>
          <xl-button
            type="primary"
            class="login-btn"
            :loading="loginLoading"
            @click="submitLogin"
          >登录</xl-button>
        </xl-form-item>
      </xl-form>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { pushPath } from '@/assets/js/utils'
import store from '@/store'
export default {
  name: 'Login',
  data() {
    return {
      loginLoading: false,
      condition: {
        userName: '',
        password: ''
      },
      rules: {
        userName: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'homePageConfig'
    ]),
    historyPath() {
      // 有的需要记住上一次跳转过来的路由
      return this.$route.query.redirect
    }
  },
  methods: {
    validateName(value) {
      return value.length > 4
    },
    validatePassword(value) {
      return value.length > 5
    },
    submitLogin() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loginLoading = true
          try {
            // 先登录
            await this.$store.dispatch('user/login', this.condition)
            // 再获取用户信息、菜单、syscode 确保有第一个子项目路由，
            await this.$store.dispatch('getAllUserInfo')
            // 最后跳转
            // 有历史参数就跳转历史路由 没有就跳转默认路由
            if (this.historyPath) {
              // 这里带来的token还是旧的 要手动更新下
              const allquery = this.historyPath.split('%26')
              const tokenQueryArr = allquery.filter(item => item.includes('token%3D'))
              const tokenQuery = tokenQueryArr[0] || ''
              const oldToken = tokenQuery.split('%3D')[1] || ''
              const pathWithNewToken = this.historyPath.replace(oldToken, store.getters.token)
              // 开始跳转
              this.$router.push(decodeURI(pathWithNewToken))
            } else {
              // 三个参数分别为：链接、页签标题、图标
              pushPath(this.homePageConfig)
            }
          } catch (error) {
            console.error(error)
          } finally {
            this.loginLoading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  background: url("../../assets/images/bg.png")
    no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg {
  width: 100vw;
  position: absolute;
  z-index: -1;
}
header {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  line-height: 48px;
  letter-spacing: 1px;
  color: #ffffff;
  opacity: 0.8;
  font-family: Source Han Sans CN;
  font-size: 16px;
  font-weight: 200;
  font-stretch: normal;
}
header > div {
  margin-right: 28px;
  cursor: pointer;
}
main {
  color: #fff;
  width: 790px;
  text-align: center;
}
main h3 {
  background: url("../../assets/images/login-logo.png") no-repeat;
  background-position: 0 center;
  font-size: 30px;
}
.login-form {
  width: 420px;
  margin: 0 auto;
  margin-top: 50px;
}
.login-btn {
  width: 420px;
  height: 50px;
  background-color: #3991eb;
  font-size: 18px;
  font-weight: 400;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 39px;
  height: 40px;
}
.login >>> .el-input__inner {
  outline: none;
  border: none;
  background-color: #7b71b1;
  border-radius: 20px;
  caret-color: #fff;
  text-indent: 12px;
  color: #fff;
  border: 1px solid #7b71b1;
}
.login >>> .el-input__inner:focus {
  border-color: #fff;
}
</style>
