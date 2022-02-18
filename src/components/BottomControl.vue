<template>
  <div class='bottom-control'>
    <audio
        :src="getMusicUrl"
        @play="changeState(true)"
        @pause="changeState(false)"
        @timeupdate="timeupdate"
        @ended="SongEnd"
        ref="audioPlayer"
        autoplay

    ></audio>
    <div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ $utils.formatSongTime(currentTime * 1000) }}</span>
        <!-- :value 是单向的  要实现双向要v-model -->
        <el-slider
            class="progressSlider"
            v-model="timeProgress"
            @change="changeProgress"
            @input="realTimeChange"
            :show-tooltip="false"
        ></el-slider>
        <span class="totalTime">{{ $utils.formatSongTime(songDetail.dt) }}</span>
      </div>
    </div>
    <div class="bottom">
      <!-- 左边 -->
      <div class="left">
        <div class="avatar">

          <img
              :src="songDetail.al.picUrl"
              alt=""
          />
          <!--        <img src="~assets/img/test.jpg" alt=""  />-->
        </div>
        <div class="musicInfo">
          <div class="musicName" >
            {{songDetail.name}}
          </div>
          <span v-for="(singer, index) in songDetail.ar" :key="singer.id" class="singer">
              <span v-if="index === 0">歌手：{{singer.name}} </span>
              <span v-else> / {{singer.name}}</span>
            </span>
        </div>
        <div class="downloadContainer">
          <!--        <i class="iconfont icon-download"></i>-->
        </div>
      </div>

      <!-- 中间 -->
      <div class="center">
        <div class="buttons">
          <span><img src="@/assets/player/play_order.png" alt="" ></span>
          <span><img src="@/assets/player/play_prev.png" alt="" @click="handlePreBtnClick"></span>
          <span>
            <img src="@/assets/player/play_pause.png" v-if="isPlay" alt="" @click="changePlayState()">
          <img src="@/assets/player/play_resume.png"  v-else alt="" @click="changePlayState()">

        </span>
          <span><img src="@/assets/player/play_next.png" alt="" @click="handleNextBtnClick"></span>
          <span></span>
        </div>
      </div>


      <!-- 右边 -->
      <div class="right">
        <div class="volumeControl">
          <span>{{realVolume}}%</span>
          <el-slider
              class="volumeSlider"
              v-model="volume"
              @change="changeVolume"
              @input="realVolumeChange"
              :show-tooltip="false"
          ></el-slider>
        </div>
        <div class="playList">
          <img src="@/assets/player/play_music.png" alt="">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { handleMusicTime, returnSecond, formatSongTimeSec } from "../../utils/utils";

let durationNum = 0

export default {
  name: 'bottom-control',
  components: {},
  data () {
    // 这里存放数据
    return {
      // 音乐总时长
      duration: "04:00",
      // 当前播放时间位置
      currentTime: 0,
      // 进度条的位置
      timeProgress: 0,
      isMounted: true,
      volume: 100,
      realVolume: 100,
      playModeIndex: 0, // 0: 循环播放 1: 单曲循环 2: 随机播放
      // playListIndex: 0,
    }
  },
  mounted() {
    // this.$refs.audioPlayer.play();
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['getMusicUrl', 'isPlay', 'songDetail', 'playListSongs', 'playListIndex', 'songId', 'songDetail']),
    // reversedMessage: function () {
    //   // if(this.isMounted) {
    //   //   return formatSongTimeSec(this.$refs.audioPlayer.duration)
    //   // }
    //
    // }
  },
  // 方法集合
  methods: {
    ...mapMutations(['setMusicIsPlay', 'updateCurrentTime', 'playMusicWithSongIdAction', 'getPlayListIndex', 'getSongId']),
    changePlayState() {
      console.log(123)
      !this.isPlay ? this.playMusic() : this.pauseMusic();
    },
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
      // this.duration = formatSongTimeSec(this.$refs.audioPlayer.duration)
    },
    changeState(state) {
      this.setMusicIsPlay(state)
    },
    changeNewMusicAction(isNext) {
        // 1.获取当前索引
      let index = this.playListIndex

      // 2.根据不同的播放模式, 获取下一首歌的索引
      switch (this.playModeIndex) {
        case 0: // 顺序播放
          index = isNext ? index + 1 : index - 1
          if (index === -1) index = this.playListSongs.length - 1
          if (index === this.playListSongs.length) index = 0
          break
        case 1: // 单曲循环
          break
        case 2: // 随机播放
          index = Math.floor(Math.random() * this.playListSongs.length)
          break
      }



      // 3.获取歌曲
      let currentSong = this.playListSongs[index]
      console.log(currentSong.id)
      if (!currentSong) {
        currentSong = this.currentSong
      } else {
        // 记录最新的索引
        this.getPlayListIndex(index)
      }

      // 4.播放新的歌曲
      this.playMusicWithSongIdAction(currentSong.id)

      this.getSongId(currentSong.id)
      this.$router.push({path:'about',query: {id:currentSong.id}})
    },
    handleNextBtnClick() {
      console.log(this.songId)
      let id = this.songId

      this.changeNewMusicAction(true)
      // this.$router.push({path:'about',query: {id:id}})

    },
    handlePreBtnClick() {
      console.log(this.songId)
      let id = this.songId

      this.changeNewMusicAction(false)
      // this.$router.push({path:'about',query: {id:id}})
      // setTimeout(() => {
      //   this.$router.push({path:'about',query: {id:id}})
      // },1000);
    },
    // 当前播放时间位置
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
      // console.log(time)
      // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
      this.updateCurrentTime(time);

      time = Math.floor(time);
      // if (time !== lastSecond) {
      //   // console.log(time);
      //   lastSecond = time;
      //
      //   // console.log(this.timeProgress);
      // }
      this.currentTime = time;
      // 计算进度条的位置
      // durationNum = returnSecond(this.duration)
      durationNum = this.$refs.audioPlayer.duration
      this.timeProgress = Math.floor((time / durationNum) * 100);
      // console.log(this.duration)
    },
    // 拖动进度条的回调
    changeProgress(e) {
      // console.log(e);
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },
    realTimeChange(e) {
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      // this.$refs.audioPlayer.currentTime = this.currentTime;
    },
    // 改变音量
    changeVolume(e) {
      this.$refs.audioPlayer.volume = e / 100;
      this.realVolume = e
    },
    realVolumeChange(e) {
      console.log(e)
      this.$refs.audioPlayer.volume = e / 100;
      this.realVolume = e
    },
    SongEnd() {
      this.changeNewMusicAction(true)
    },
  },
  watch: {
  }
}
</script>
<style lang="scss" scoped>

.bottom-control {
  /* background-color: pink; */
  border-top: 1px solid #ddd;
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 6px 10px;
  z-index: 10000;
  background-color: #999999;
}


.bottom {
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;
  align-items: center;
  width: 123px;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 10px;
    cursor: pointer;
  }

  .avatar img {
    width: 100%;
  }

  .musicInfo {
    color: rgb(37, 37, 37);
    font-size: 12px;
    width: 70px;
  }

  .musicName {
    margin-bottom: 4px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singer {
    transform: scale(0.9);
    margin-left: -3px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }



}

.center {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons {
    display: flex;
    align-items: center;
    height: 13px;

    span {
      display: inline-block;
      width: 50px;
      box-sizing: border-box;
      text-align: center;
    }

    img {
      height: 20px;
      width: 20px;
    }

  }

  .buttons span:nth-child(3) i {
    font-size: 25px;
  }

  //.center .icon-xunhuan {
  //  font-size: 17px;
  //}
  //.center .icon-xihuan {
  //  font-size: 15px;
  //}
}

.right {
  display: flex;
  align-items: center;
  position: relative;
}

.volumeControl {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.icon-yinliang {
  font-size: 18px;
  margin-right: 7px;
}

.volumeSlider {
  width: 55px;
  z-index: 99;
}

//.icon-bofangliebiao {
//  font-size: 18px;
//  margin-right: 10px;
//}



.progressBar {
  display: flex;
  align-items: center;
  height: 10px;
  overflow: hidden;

  .progressSlider {
    width: 1300px;
  }

  .currentTime,
  .totalTime {
    font-size: 12px;
    transform: scale(0.85);
    color: #aaa;
    margin: 0 5px;
    width: 30px;
    text-align: center;
  }

}

</style>
