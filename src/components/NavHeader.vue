<template>
  <div class="header">
    <Row class-name="wrapper">
      <!-- logo -->
      <iCol span="4" class-name="nav">
        <div class="navLogo"></div>
      </iCol>
      <!-- 导航栏列表 -->
      <iCol span="12">
        <ul class="navMenu">
          <li v-for="navItem in navMenuList" :key="navItem.id"
              class="navList">
            <router-link :to="navItem.path" class="navListItem"
                         active-class="is-active">
              {{ navItem.name }}
            </router-link>
          </li>
        </ul>
      </iCol>
      <!-- 搜索框 -->
      <iCol span="6">
        <Input prefix="ios-search" placeholder="请输入歌名、歌词、歌手或专辑" />
      </iCol>
      <!-- 登录按钮 -->
      <iCol span="2" class-name="userAvator">
        <div class="logined" v-if="isLogin">
          <Dropdown>
            <a href="javascript:void(0)">
              <Badge :count="99">
                <Avatar shape="circle"
                src="http://p3.music.126.net/N5bF7cT03c_0dDTLVG1JbQ==/109951166860679554.jpg?param=30y30" />
              </Badge>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem><Icon type="md-person" /> 我的主页</DropdownItem>
              <DropdownItem><Icon type="md-text" /> 我的消息</DropdownItem>
              <DropdownItem><Icon type="md-ribbon" /> 我的等级</DropdownItem>
              <DropdownItem><Icon type="md-settings" /> 个人设置</DropdownItem>
              <DropdownItem divided><Icon type="md-log-out" /> 退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
        <Button type="default" shape="circle" icon="md-cloudy"
                class="loginBtn" ghost v-else @click="loginDialog">登录</Button>
      </iCol>
    </Row>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: 'nav-header',
  props: {
    msg: String
  },
  data() {
    return {
      isLogin: false,
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
      ],
    }

  },
  methods: {
    ...mapMutations(['setLoginDialog']),
    loginDialog() {
      this.setLoginDialog(true)
    },
  }
}
</script>

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
  line-height: 60px;
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

// 登录按钮激活
.loginBtn{
  &.ivu-btn-default:hover {
    color: #2c3e50;
    border-color: #2c3e50;
  }
}

// 下拉菜单
.ivu-dropdown  {
  /deep/ .ivu-select-dropdown {
    background-image: linear-gradient(135deg,
        rgba(139, 198, 236, 0.5) 0%, rgba(149, 153, 226, 0.5) 100%);
  }
}

// 下拉菜单中分割线
.ivu-dropdown {
  /deep/ .ivu-dropdown-item-divided:before {
    margin: 0;
    height: 0;
  }
}

</style>
