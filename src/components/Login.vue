<template>
  <div class="login">
<!--    class="vertical-center-modal"-->
    <el-dialog
        title="登录"
        :visible.sync="handleDialogClose"
        center
        :modal="true"
        width="400px"
        :close-on-click-modal="false"
        @close="clearLoginForm"
    class="demo">
      <div slot="title" style="color:#f60;text-align:center">
        <router-link to="/index" active-class="is-active">
          登录
        </router-link>
        <router-link to="/demo" active-class="is-active">
          注册
        </router-link>
      </div>
      <div class="loginModalBody" style="text-align:center">
        <el-form class="loginModalForm" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="phone">
            <el-input prefix-icon="el-icon-user" type="text" v-model="loginForm.phone" placeholder="请输入网易云账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="footerBtn">
        <el-button type="default" size="large" round @click="submitForm">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {login, getUserInfo, recommendplaylist} from '/apis/api'

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
    return {
      // 登录所需账号密码
      loginForm: {
        phone: '',
        password: ''
      },
      // 账号密码所需的校验规则
      loginFormRules: {
        phone: [
          { required: true, message: '请输入绑定网易云的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入网易云密码', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setLoginDialog', 'setLogin', 'setUserInfo', 'setRecommendPlayList']),
    // 提交账号密码
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 前端校验通过后发送账号密码
        if (valid) {

          const { phone, password } = this.loginForm
          const params = {
            phone: phone,
            password: password
          };

          let res = await login(params);

          if (res.status !== 200) {
            this.$notify.error({
              title: '错误',
              message: '数据请求失败'
            });

            // 请求成功后将数据保存到 localStorage
          } else {
            this.getUserInfo(res.data.profile.userId)
            // 存储 token 和 cookie 信息，将登录标记为 true
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('cookie', res.data.cookie)
            window.sessionStorage.setItem('isLogin', true)
            window.sessionStorage.setItem('isLogin', true)
            // 关闭登录窗口
            this.setLoginDialog(false)
            // this.$cookies.set('MUSIC_U', res.data.token, null,'/','cloud-music.pl-fe.cn',null,null)
            // this.$cookies.set('MUSIC_U', res.data.token)
            this.getRecommendPlayList()
          }
        } else {
          alert('error submit')
        }
      })
    },
    // 获取每日推荐歌单数据
    async getRecommendPlayList() {

      let res = await recommendplaylist();

      if (res.status !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
      }
      this.setRecommendPlayList(res.data.recommend)
      this.recommendPlayList = res.data.recommend
    },
    // 获取用户详情信息
    async getUserInfo(uid) {
      const params = {
        uid: uid,
      };

      let res = await getUserInfo(params);

      if (res.status !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
        // 请求成功后将数据保存到 localStorage
      } else {
        // 存储用户详情到 localStorage
        window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.profile))
        this.setLogin(true)
        this.setUserInfo(res.data.profile)
      }
    },
    // 清除表单中的账号密码
    clearLoginForm() {
      this.loginForm.phone = ''
      this.loginForm.password = ''
    },
  },
  computed: {
    ...mapState(['loginDialogVisible']),
    // 控制登录弹窗的隐藏
    // 使用计算属性设置 set 来解决报错 was assigned to but it has no setter
    handleDialogClose: {
      get() {
        return this.loginDialogVisible
      },
      // 当 loginDialogVisible 被修改时 set 就被调用，返回 false 关闭窗口
      set(value) {
        this.setLoginDialog(value)
      }
    },
  }
}
</script>


<style lang="scss" scoped>

// 登录弹窗背景
.demo {
  /deep/ .el-dialog {
    background-image: linear-gradient(135deg,
        rgba(139, 198, 236, 0.5) 0%, rgba(149, 153, 226, 0.5) 100%);
    box-shadow: 0 2px 10px 0 rgba(52, 52, 52, .1);
  }

  .ivu-modal-body {
    .ivu-form-item {
      padding: 10px 0px;
      .ivu-input{
        height: 50px;

      }
      .ivu-input-icon{
        height: 50px;
      }
    }
  }
}

// 登录弹窗在页面居中
/deep/ .vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal{
    top: 0;
  }
}

.loginModalBody {
  height: 200px;
  // 输入框居中
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 输入框宽度
  .loginModalForm {
    width: 100%;
    // 输入框图标
    /deep/ .ivu-input-prefix {
      top: 8px;
      left: 3px;
      i {
        font-size: 25px;
      }
    }
  }
}

.is-active {
  border-bottom: 2px solid rgb(194, 12, 12);
  background-color: rgba(255, 255, 255, 0.1);
  height: 80px;
  line-height: 80px;
  color: rgb(194, 12, 12);
}

.footerBtn {
  text-align: center;
}
</style>
