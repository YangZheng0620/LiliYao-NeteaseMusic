<template>
  <div class='no-more'>
    <el-image :src="require('@/assets/no-more.png')"></el-image>
    <span>没有更多内容了</span>
    <el-image :src="require('@/assets/nomore2.png')"></el-image>
  </div>
</template>

<script>
export default {
  name: 'no-more',
  components: {},
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
<style lang="scss" scoped>

.no-more {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin: 0 20px;
    font-weight: 700;
  }
}
</style>
