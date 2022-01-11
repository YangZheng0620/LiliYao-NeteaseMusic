<template>
  <div class="header">
    <el-row class="wrapper">
      <!-- logo -->
      <el-col :span="4">
        <div class="navLogo"></div>

      </el-col>
      <!-- 导航栏列表 -->
      <el-col :span="12">
        <ul class="navMenu">
          <li v-for="navItem in navMenuList" :key="navItem.id"
              class="navList">
            <router-link :to="navItem.path" class="navListItem"
                         active-class="is-active">
              {{ navItem.name }}
            </router-link>
          </li>
        </ul>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="6">
        <el-popover width="400" trigger="focus" placement="bottom"
                    transition="fade-in-linear">

          <search :searchSuggestList="searchSuggestList" :searchHotSongsList="searchHotSongsList"
                  :activeNumList="activeNumList" :searchKeywords="searchKeywords"></search>

          <el-input v-model="searchKeywords" prefix-icon="el-icon-search" placeholder="请输入歌名、歌词、歌手或专辑"
                    slot="reference" @input="handleInput" @keyup.enter.native="handleInputChange()" clearable/>
        </el-popover>

      </el-col>
      <!-- 登录按钮 -->
      <el-col :span="2" class="user-avatar">
        <div class="logined" v-if="isLogin">
          <el-dropdown placement="bottom-start" @command="userMenuHandler">
            <a href="javascript:void(0)">
              <el-badge :value="200" :max="99">
<!--                <el-image :src="userInfo.avatarUrl" lazy class="avatar"></el-image>-->
                <el-avatar shape="circle" size="medium"
                 :src="userInfo.avatarUrl"/>
              </el-badge>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="userNickname">{{userInfo.nickname}}</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-user-solid"></i> 我的主页</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-chat-dot-round"></i> 我的消息</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-medal"></i> 我的等级</el-dropdown-item>
              <el-dropdown-item><i class="el-icon-setting"></i> 个人设置</el-dropdown-item>
              <el-dropdown-item command="quit"><i class="el-icon-switch-button"></i> 退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
        <el-button type="default" round icon="el-icon-cloudy-and-sunny"
                class="loginBtn" v-else @click="loginDialog" plain>登录</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Search from "@/components/Search";
import { logout, getSearchSuggest, getSearchHotSongs} from '/apis/api'
import debounce from '/utils/debounce'


// 使用防抖函数来处理输入框事件
const debounceGetSearchSuggest = debounce(getSearchSuggest, 1000)

export default {
  name: 'nav-header',
  props: {
    msg: String
  },
  components: {
    Search,
  },
  data() {
    return {
      // isLogin: true,
      searchKeywords: '',
      activeNumList: [1, 2, 3], // 热搜榜前三名样式序号
      navMenuList: [
        {
          id: 1,
          name: "发现音乐",
          path: "/about",

        },
        {
          id: 2,
          name: "排行榜",
          path: "/demo",
        },
        {
          id: 3,
          name: "歌单",
          path: "/index",
        },
        {
          id: 4,
          name: "电台",
          path: "/bbb",
        },
        {
          id: 5,
          name: "我的音乐",
          path: "/aaa",
        },
      ], // 菜单列表
      searchSuggestList: [], // 搜索建议列表
      searchHotSongsList: [], // 热搜歌曲列表
    }

  },
  methods: {
    ...mapMutations(['setLoginDialog', 'setLogin', 'setUserInfo', 'setRecommendPlayList']),

    loginDialog() {
      this.setLoginDialog(true)
    },
    // 顶部头像下拉菜单
    userMenuHandler (type) {
      switch (type) {
        case 'home' :
          this.$router.push({
            name: 'homePage'
          })
          break
        case 'grade' :
          this.$router.push({
            name: 'grade'
          })
          break
        case 'set':
          this.$router.push({
            name: 'setting'
          })
          break
        case 'quit':
          this.logout()
          break
      }
    },
    // 退出登录
    async logout () {
      const { data: res } = await logout();

      if (res.code !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
      }

      this.$notify({
        message: '退出成功',
        type: 'success'
      });

      // 删除存储在本地的用户信息
      window.sessionStorage.removeItem('isLogin')
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('cookie')
      window.sessionStorage.removeItem('userInfo')

      this.setLogin(false)
      this.setRecommendPlayList([])
      this.setUserInfo() // 删除用户详情信息

      // if (this.$route.path.indexOf('/my') >= 0) {
      //   this.$router.push({ path: '/' })
      // }
    },
    // 输入框处理事件
    async handleInput() {
      // 判断是空字符的处理逻辑
      if (!this.searchKeywords) {
        this.searchSuggestList = []
        debounceGetSearchSuggest.cancel()
        return
      }
      try {
        const params = {
          keywords: this.searchKeywords
        };
        let res = await debounceGetSearchSuggest(params);
        if (res.status !== 200) {
          console.log('数据请求失败')
        }

        // 如果没有搜索建议则进入此判断，重新显示热歌榜
        if (Object.keys(res.data.result).length === 0) {
          this.searchSuggestList = []
          return
        }

        this.searchSuggestList = res.data.result
        console.log(res.data.result)
      } catch (error) {
        console.log(error)
      }
    },

    async handleInputChange () {
      console.log(this.searchKeywords)
    },
    // 获取热门榜单歌曲
    async searchHotSongs() {
      try {

        let res = await getSearchHotSongs();
        if (res.status !== 200) {
          console.log('数据请求失败')
        }
        this.searchHotSongsList = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
    ...mapGetters(['isLogin', 'userInfo']),
  },
  mounted() {
    this.searchHotSongs()
  },
}
</script>

<style lang="scss">

.el-popover {
  padding: 0;
}
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

/* 导航栏公共样式 */
.header {
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  box-shadow: 0 2px 10px 0 rgba(52, 52, 52, .1);

  position: relative;
}

.wrapper {
  /* 元素居中 */
  display: flex;
  align-items: center;
}

/* logo 精灵图样式 */
.navLogo {
  display: inline-block;
  line-height: 40px;
  padding: 10px 0;
  width: 160px;
  height: 40px;
  background-image: url("../assets/navHeader/topbar.png");
  background-repeat: no-repeat;
  background-position: 0 -15px;
}

.navMenu {
  li {
    display: inline-block;
    height: 80px;
    line-height: 80px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  /* 设置鼠标滑动时背景透明度 */
  .navList:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  /* 主项目列表 */
  .navListItem {
    display: inline-block;
    padding: 0 20px;
    font-size: 14px;
    height: 80px;
    line-height: 80px;
    color: #2c3e50;

  }

  /* 主项目列表激活时样式 */
  .is-active {
    border-bottom: 2px solid rgb(194, 12, 12);
    background-color: rgba(255, 255, 255, 0.1);
    height: 80px;
    line-height: 80px;
    color: rgb(194, 12, 12);
  }


}


/*
    iView 需要使用样式穿透
    Sass 、Less 等预处理器无法正确解析 >>>
    可以使用 /deep/ 操作符
*/
/deep/ Input {
  border-radius: 50px;
}

.el-autocomplete {
  width: 100%;
}
// 下拉菜单中的用户名字
.userNickname {
  text-align: center;
  font-weight: bold;
  color: white;
}


// 登录按钮激活
.loginBtn{
  &.ivu-btn-default:hover {
    color: #2c3e50;
    border-color: #2c3e50;
  }
}

// 下拉菜单
.el-dropdown-menu  {
  background-image: linear-gradient(135deg,
      rgba(139, 198, 236, 0.5) 0%, rgba(149, 153, 226, 0.5) 100%);

  // 下拉菜单位置
  position: absolute;
  top: 130px !important;
}

// 下拉菜单中分割线
//.el-dropdown-menu {
//  /deep/ .el-dropdown-menu__item--divided:before {
//  }
//}

.user-avatar {
  text-align: center;

  .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  //.el-dropdown {
  //  padding: 20px 0;
  //  font-size: 0;
  //}
}


</style>
