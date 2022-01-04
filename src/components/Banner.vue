<template>
  <div class="banner">
    <el-carousel :interval="6000" type="card" height="300px" trigger="click">
      <el-carousel-item v-for="banner in banners" :key="banner.imageUrl">
        <img :src="banner.imageUrl">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner } from '/apis/api'

export default {
  name: 'banner',
  data() {
    return {
      banners: [], // 存储轮播图数据
    }
  },

  created() {
    // 调用【获取轮播图数据】方法
    this.getBanner()
  },
  methods: {
    // 获得轮播图数据
    async getBanner () {
      try {
        const params = {
          type: 0
        };

        let res = await getBanner(params);
        console.log(res)

        if (res.status !== 200) {
          console.log('数据请求失败')
        }

        this.banners = res.data.banners
      } catch (error) {
        console.log(error)
      }
    },
  },
  computed: {
  }
}
</script>


<style lang="scss" scoped>

.banner {

  background-image: linear-gradient(135deg,
      rgba(139, 198, 236, 0.5) 0%, rgba(149, 153, 226, 0.5) 100%);
  padding: 20px 0;

  .el-carousel__item {
    img {
      height: 100%;
      width: 100%;
      border-radius: 6px;
    }

    // 激活时样式改变
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    // 激活时样式改变
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }


  }

}

// 轮播图指示器按钮颜色
/deep/ .el-carousel__button {
  background-color: rgb(194, 12, 12);
}

</style>
