<template>
  <div class="index">
    <Banner></Banner>
    <div class="recommendList">
      <div class="title">
        <h3>热门歌单</h3>
        <span v-for="(item, index) in playListTags" :key="item.id"
              :class="index == playListIndex ? 'active' : ''" @click="choosePlayListType(index)">
          {{ item.name }}
        </span>
        <span>换一批</span>
      </div>
    </div>
    <play-list :playList="playList"></play-list>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import PlayList from '@/components/PlayList.vue'
import {hotplaylist, playlist} from "../../apis/api";

export default {
  name: 'Index',
  components: {
    Banner,
    PlayList,
  },
  data() {
    return {
      playListTags: [],
      playListIndex: 0,
      playListParams: { limit: 5, offset: 0 },
      playList: [],
    }
  },
  created() {

    this.homeInit()
  },
  methods: {
    // 获取热门歌单分类标签
    async getHotTags() {
      let res = await hotplaylist();

      if (res.status !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
      }

      this.playListTags = res.data.tags
    },
    // 获取分类歌单列表
    async getPlayList(params) {

      let res = await playlist(params);

      if (res.status !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
      }

      this.playList = res.data.playlists

    },
    // 选择歌单的标签
    choosePlayListType(index) {
      this.playListIndex = index // 获取歌单标签索引，来激活标签
      // 通过获取标签索引来得到标签名字
      this.playListParams.cat = index !== 0 ? this.playListTags[index].name : ''
      console.log(this.playListParams)

      this.getPlayList(this.playListParams)

    },
    homeInit() {
      this.getHotTags()
      this.getPlayList(this.playListParams)
    },
  },
}
</script>

<style lang="scss" scoped>

.title {
  padding: 20px 0 0;
  text-align: center;

  h3 {
    padding: 20px 0;
    font-size: 28px;
    font-weight: 700;
  }

  span {
    display: inline-block;
    font-size: 16px;
    margin: 0 24px;
    color: #333;
    cursor: pointer;

    &.active {
      position: relative;
      font-weight: 600;
      color: #000;

      &:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 1px;
        width: 100%;
        height: 6px;
        background: rgb(142, 184, 233);
        z-index: -1;
      }
    }
  }
}
</style>
