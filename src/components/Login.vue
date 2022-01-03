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
        <el-form class="loginModalForm" ref="formInline" :model="formInline" :rules="ruleInline">
          <el-form-item prop="user">
            <el-input prefix-icon="el-icon-user" type="text" v-model="formInline.user" placeholder="请输入网易云账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" v-model="formInline.password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="footerBtn">
        <el-button type="default" size="large" round>登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'login',
  props: {
    msg: String
  },
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setLoginDialog']),
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
