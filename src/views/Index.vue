<template>
  <div class="index">
    <Banner></Banner>
    <div class="recommendPlayList" v-if="isLogin">
      <div class="title">
        <h3>为您推荐</h3>
      </div>
      <recommend-play-list :recmdPlayList="recommendPlayList"></recommend-play-list>
    </div>
    <tags-list :playListTags="playListTags" :playListIndex="playListIndex"
               :refreshPlayList="refreshPlayList" :choosePlayListType="choosePlayListType">
      <h3>热门歌单</h3>
    </tags-list>
<!--    <div class="recommendList">-->
<!--      <div class="title">-->
<!--        <h3>热门歌单</h3>-->
<!--        <span v-for="(item, index) in playListTags" :key="item.id"-->
<!--              :class="index == playListIndex ? 'active' : ''" @click="choosePlayListType(index)">-->
<!--          {{ item.name }}-->
<!--        </span>-->
<!--        <span class="refresh" @click="refreshPlayList">-->
<!--          <i class="el-icon-refresh-left"></i> 换一批-->
<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
    <play-list :playList="playList"></play-list>

  </div>
</template>

<script>
import Banner from '@/components/Banner'
import TagsList from '@/components/TagsList'
import PlayList from '@/components/PlayList.vue'
import RecommendPlayList from '@/components/RecommendPlayList.vue'
import {hotplaylist, playlist, recommendplaylist} from "../../apis/api";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'Index',
  components: {
    Banner,
    PlayList,
    RecommendPlayList,
    TagsList
  },
  data() {
    return {
      playListTags: [],
      playListIndex: 9,
      playListParams: { limit: 5, offset: 0, cat: 'ACG' },
      playListHasMore: true,
      playList: [], // 热门分类歌单
    }
  },
  created() {

    this.homeInit()
  },
  methods: {
    ...mapMutations(['setRecommendPlayList']),

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
      this.playListHasMore = res.data.more
    },
    // 选择歌单的标签
    choosePlayListType(index) {
      this.playListIndex = index // 获取歌单标签索引，来激活标签
      this.playListParams.offset = 0 // 将 offset 恢复为 0
      // 通过获取标签索引来得到标签名字
      this.playListParams.cat = index !== 0 ? this.playListTags[index].name : '华语'
      console.log(this.playListParams)

      this.getPlayList(this.playListParams)

    },
    // 换一批歌单
    refreshPlayList() {
      // 如果还有更多则可以继续换一批，如果没有的话就重置从 0 开始
      if (this.playListHasMore) {
        this.playListParams.offset += 5
      } else {
        this.playListParams.offset = 0
        this.playListHasMore = true
      }
      this.getPlayList(this.playListParams)
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

      // this.setRecommendPlayList(res.data.recommend.slice(0, 5))
      this.recommendPlayList = res.data.recommend.slice(0, 5)

    },
    homeInit() {
      this.getHotTags()
      this.getPlayList(this.playListParams)
      if (window.sessionStorage.getItem('isLogin')) {
        this.getRecommendPlayList()
      }

    },

  },
  computed: {
    ...mapGetters(['isLogin']),
    // 监测每日推荐歌单列表
    recommendPlayList: {
      get() {
        return this.$store.state.recommendPlayList
      },
      set(value) {
        this.$store.commit('setRecommendPlayList', value)
      }
    }
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

  span:hover {
    color: #31c27c;

  }

}
</style>
