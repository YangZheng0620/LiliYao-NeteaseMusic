<template>
  <div id="app">
    <el-backtop :bottom="60">
      <el-image class="back-top" :src="require('./assets/backTop.png')"></el-image>
    </el-backtop>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <router-view/>
    <bottom-control></bottom-control>
  </div>
</template>

<script>
import BottomControl from "@/components/BottomControl";

export default {
  name: 'app',
  components: {
    BottomControl,
  },
  data () {
    // 这里存放数据
    return {
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1150px; // 安全宽度
  .back-top {
    margin: 5px;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
