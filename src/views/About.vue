<template>
  <div class="about">
    <img class="background" :src="songDetail.al.picUrl" alt="">
    <div class="closeCard">
      <i class="iconfont icon-arrow-down-bold"></i>
    </div>
    <div class="musicDetailCardContainer">
      <div class="top">
        <div class="left">
          <div class="discContainer">

            <!-- 通过音乐的加载时差删除discAnimation类名再添加,达到重置动画的效果 -->
            <div
                class="disc"
            >
<!--              <img src="~assets/img/MusicDetailCard/disc.png" alt="" />-->
<!--              <img-->
<!--                  src="@/assets/60b0f4afc9524dd79376f5c91897630a.jpeg"-->
<!--                  alt=""-->
<!--                  class="musicAvatar"-->
<!--              />-->
              <img
                  :src="songDetail.al.picUrl"
                  alt=""
                  class="musicAvatar"
              />
<!--              <img-->
<!--                  src="https://qpic.y.qq.com/music_cover/JOcib8DcZVqmEWnhqic9L7tSaHiaiccgibtFibAxf8nkB8xxBDNgHGRkmRdw/300?n=1"-->
<!--                  alt=""-->
<!--                  class="musicAvatar"-->
<!--              />-->
            </div>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <div class="musicName">{{songDetail.name}}</div>

            <span v-for="(singer, index) in songDetail.ar" :key="singer.id" class="singer">
              <span v-if="index === 0">歌手：{{singer.name}} </span>
              <span v-else> / {{singer.name}}</span>
            </span>

            <div
                class="album"
                v-if="songDetail.alia.name"
            >
              <span>专辑：{{songDetail.alia.name}}</span>
            </div>
          </div>
          <lyrics-scroll></lyrics-scroll>
        </div>

      </div>
      <div class="bottom">
        <songComments :getSongComment="songCommentList" :getHotSongComment="songHotCommentList"></songComments>
      </div>
    </div>
    </div>

</template>

<script>

import LyricsScroll from "@/components/LyricsScroll";
import SongComments from "@/components/SongComments";
import {getMusicUrl, getSongDetail, getSongComment} from "../../apis/api";
import {mapGetters, mapMutations} from "vuex";


export default {
  name: 'about',
  components: {
    LyricsScroll,
    SongComments
  },
  data () {
    // 这里存放数据
    return {
      isLoading: false,
      limit: 10,
      currentPageIndex: 1,
      // musicUrl: '',
      // songDetail: [],
      songCommentList: [],
      songHotCommentList: [],
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['musicUrl', 'songDetail', 'songId']),

  },
  watch: {
    'songId'(value) {
      this.getSongComment(value)
    },
  },
  // 方法集合
  methods: {
    ...mapMutations(['setMusicUrl', 'getSongDetail']),
    // 获得歌单详情
    async getAlbumDetail(id) {

      try {

        let res = await getMusicUrl(id);
        if (res.status !== 200) {
          console.log('数据请求失败')
        }
        if (this.musicUrl === res.data.data[0].url) return
        this.setMusicUrl(res.data.data[0].url)

        let res2 = await getSongDetail(id);
        if (res2.status !== 200) {
          console.log('数据请求失败')
        }

        this.songDetail= res2.data.songs[0]
        this.getSongDetail(res2.data.songs[0])



      } catch (error) {
        console.log(error)
      }
    },
    // 获取歌曲评论
    async getSongComment(id, limit, offset) {
      try {

        let res = await getSongComment(id, limit, offset);

        if (res.status !== 200) {
          console.log('数据请求失败')
        }

        this.songCommentList = res.data.comments
        this.songHotCommentList = res.data.hotComments
        console.log(res.data.comments)

      } catch (error) {
        console.log(error)
      }

    },
  },

  mounted() {
    this.getAlbumDetail(this.$route.query.id)
    console.log(this.songId)
    this.getSongComment(this.$route.query.id)
    // this.getSongComment(this.songId)
  }
}
</script>

<style scoped lang="scss">

.about {
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 1024px;
  filter: blur(80px);
  box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.3);
  content: "";
  width: 100%;
  height: auto;
  z-index: -1;
}

.glassCard {
  // 火狐默认不支持backdrop-filter 可以手动激活，这里不折腾了，火狐关闭玻璃背景功能，反正这个功能特别吃性能，字体也看不清了，没必要
  backdrop-filter: blur(50px) brightness(95%) !important;
  background-color: unset !important;
  background-image: unset !important;
  * {
    color: rgb(37, 37, 37);

    .commentComponent /deep/ * {
      color: rgb(37, 37, 37);
      border-color: rgb(143, 143, 143);

      .replied {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.musicDetailCard {
  position: fixed;
  width: 100%;
  // height: calc(100vh - 55px);
  height: calc(80vh - 55px);
  bottom: 55px;
  left: 0;
  z-index: 1000;
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
}

.closeCard .iconfont {
  position: absolute;
  top: 15px;
  left: 35px;
  font-size: 21px !important;
}

.musicDetailCardContainer {
  height: 100%;
  overflow-y: scroll;
}

.hide {
  // bottom: calc(-100vh + 55px);
  bottom: calc(-80vh + 55px);
  // transform不会引发重流 性能更好 但是这里如果使用transform 在resize时会出现musicDetailCard拖影的情况，是transition引发的，
  // 可能可以通过animation代替transtion解决，不太确定，没有尝试过，但是使用transform还需另外禁止index页面滚动，
  // 所以我这里还是选择使用固定定位 性能稍差，但是由于脱离的文档流，也不会差很远
  // transform: translateY(calc(80vh - 55px));
}

.top {
  display: flex;
  justify-content: center;
}

.left {
  width: 700px;
  margin: 0 30px 0 -40px;
}

.discContainer {
  margin-top: 60px;
  width: 300px;
  position: relative;
  z-index: 1;
}

.disc {
  width: 500px;
  height: 500px;
  position: relative;
  top: -12px;

  .musicAvatar {
    width: 500px;
  }
}

.disc img:nth-child(1) {
  width: 100%;
}

.disc .musicAvatar {
  position: absolute;
  top: 35px;
  left: 35px;
  width: 150px;
  z-index: -1;
}

/* 碟子设置旋转动画 */
.discAnimation {
  /* infinite动画无限循环 */
  animation: disc 25s linear infinite;
  /* 动画延迟一秒 */
  animation-delay: 0.8s;
}

@keyframes disc {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.pause {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

.right {
  width: 350px;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin: 30px 0 15px;
  color: rgb(145, 145, 145);
}

.title div {
  margin: 7px 0;
}

.musicName {
  font-size: 23px;
  color: rgb(22, 22, 22);
  font-weight: 700;
}

.singer {
  font-size: 12px;
  color: rgb(22, 22, 22);
}

.bottom {
  margin: 40px auto;
  // width: 55vw;
  width: 44vw;
  display: flex;
  justify-content: center;
}

.page {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
}

.tip {
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.changeBackground {
  position: absolute;
  bottom: 10px;
  right: 20px;
  cursor: pointer;
}

.bottom /deep/ .el-loading-spinner {
  top: 40px;
}

.album,
.singer {
  cursor: pointer;
}
</style>