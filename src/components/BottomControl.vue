<template>
  <div class='bottom-control'>
    <audio
        :src="musicUrl"
        @play="changeState(true)"
        @pause="changeState(false)"
        @timeupdate="timeupdate"
        ref="audioPlayer"

        autoplay
    ></audio>
    <div>
      <!-- 进度条 -->
      <div class="progressBar">
        <span class="currentTime">{{ currentTime }}</span>
        <!-- :value 是单向的  要实现双向要v-model -->
        <el-slider
            class="progressSlider"
            v-model="timeProgress"
            @change="changeProgress"
        ></el-slider>
        <span class="totalTime">{{ duration }}</span>
      </div>
    </div>
    <div class="bottom">
      <!-- 左边 -->
      <div class="left">
        <div class="avatar">
          <img
              src="https://qpic.y.qq.com/music_cover/JOcib8DcZVqmEWnhqic9L7tSaHiaiccgibtFibAxf8nkB8xxBDNgHGRkmRdw/300?n=1"
              alt=""
          />
          <!--        <img src="~assets/img/test.jpg" alt=""  />-->
        </div>
        <div class="musicInfo">
          <div class="musicName" >
            预兆
          </div>
          <div
              class="singer"
          >
            芝麻Mochi
          </div>
        </div>
        <div class="downloadContainer">
          <!--        <i class="iconfont icon-download"></i>-->
        </div>
      </div>

      <!-- 中间 -->
      <div class="center">
        <div class="buttons">
          <span><img src="@/assets/player/play_order.png" alt=""></span>
          <span><img src="@/assets/player/play_prev.png" alt=""></span>
          <span>
            <img src="@/assets/player/play_pause.png" v-if="isPlay" alt="" @click="changePlayState()">
          <img src="@/assets/player/play_resume.png"  v-else alt="" @click="changePlayState()">

        </span>
          <span><img src="@/assets/player/play_next.png" alt=""></span>
          <span></span>
        </div>
      </div>


      <!-- 右边 -->
      <div class="right">
        <div class="volumeControl">
          <el-slider
              class="volumeSlider"
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
import { handleMusicTime, returnSecond } from "../../utils/utils";
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
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['musicUrl', 'isPlay']),

  },
  // 方法集合
  methods: {
    ...mapMutations(['setMusicIsPlay', 'updateCurrentTime']),
    changePlayState() {

      !this.isPlay ? this.playMusic() : this.pauseMusic();
    },
    // 播放音乐的函数
    playMusic() {
      this.$refs.audioPlayer.play();
    },
    // 暂停音乐的函数
    pauseMusic() {
      this.$refs.audioPlayer.pause();
    },
    changeState(state) {
      this.setMusicIsPlay(state)
    },
    // 当前播放时间位置
    timeupdate() {
      // console.log(e);
      // console.log(this.$refs.audioPlayer.currentTime);
      // 节流
      let time = this.$refs.audioPlayer.currentTime;
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
      durationNum = returnSecond(this.duration)
      this.timeProgress = Math.floor((time / durationNum) * 100);
      console.log(this.duration)
    },
    // 拖动进度条的回调
    changeProgress(e) {
      console.log(e);
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
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
