<template>
  <div class='lyrics-scroll'>
    <!-- 占位 -->
    <div class="placeholder"></div>
    <!-- 因为歌词快了一句,所以减1 -->
    <!-- 歌词item -->
<!--    <div-->
<!--        class="lyricsItem"-->
<!--    >-->
<!--      {{ item[1] }}-->
<!--    </div>-->
    <div class="lyrics" >
      <div class="lyricsItem" v-for="(lyric, index) in lyricInfos" :key="index" :class="currentLyricIndex === index ? 'lyric-active': ''"
      >
        {{lyric.text}}
        <div>{{lyric.transText}}</div>
      </div>
    </div>

    <!-- 占位 -->
    <div class="placeholder"></div>


  </div>
</template>

<script>
import {getSongLyric} from "../../apis/api";
import {parseLyric} from '../../utils/parse-lyric'
import {returnSecond} from "../../utils/utils";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'lyrics-scroll',
  components: {},
  data () {
    // 这里存放数据
    return {
      lyricInfos: [], // 歌词信息
      currentLyricIndex: 0, // 歌词下标
      currentLyricText: "", // 当前歌词
      currentTime: 0, // 歌曲当前播放时间
      lyricScrollTop: 0,
      lyricTransform: "",
      isTransText: false, // 是否有翻译歌词
    }
  },
  created() {
    this.getPageData()

  },
  mounted() {
    // window.addEventListener('mousewheel',this.handleScroll);
    // console.log(this.$el.querySelector(".lyrics").scrollTop)

    // this.$el.querySelector(".lyrics").scrollTop = 500

  },
  updated () {
    this.$nextTick(function () {
      let index = this.currentLyricIndex
      if (this.isTransText) {
        if (index > 6) {
          this.$el.querySelector(".lyrics").scrollTop = index * 55
        } else {
          this.$el.querySelector(".lyrics").scrollTop = index * 40
        }
      } else {
        if (index > 6) {
          this.$el.querySelector(".lyrics").scrollTop = index * 40
        } else {
          this.$el.querySelector(".lyrics").scrollTop = index * 20
        }
      }



    });
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['songCurrentTime', 'songId']),
    // 歌曲实时滚动
    // lyricTransform() {
    //   if (this.currentLyricIndex > 6) {
    //     return `transform: translateY(-${this.currentIndex * 65}px)`;
    //   } else {
    //     return 'transform: translateY(0)';
    //   }
    // },
  },
  watch: {
    'songCurrentTime'(value) {
      // console.log(value)
      // 1.获取当前时间
      const currentTime = value * 1000
      // console.log(currentTime)
      // 2.根据当前时间修改currentTime
      this.currentTime = currentTime

      // 3.根据当前时间去查找播放的歌词
      if (!this.lyricInfos.length) return
      let i = 0
      for (; i < this.lyricInfos.length; i++) {
        const lyricInfo = this.lyricInfos[i]
        if (currentTime < lyricInfo.time) {
          break
        }
      }
      // 设置当前歌词的索引和内容
      const currentIndex = i - 1
      if (this.currentLyricIndex !== currentIndex) {
        const currentLyricInfo = this.lyricInfos[currentIndex]
        // console.log(currentLyricInfo)
        this.currentLyricIndex = currentIndex
        // if (this.currentLyricIndex > 6) {
        //   let index = this.currentLyricIndex
        //   this.lyricTransform = `transform: translateY(-${index * 55}px)`;
        // } else {
        //   this.lyricTransform = 'transform: translateY(0)';
        // }
        if (currentLyricInfo) {
          this.currentLyricText = currentLyricInfo.text
        }

      }
    },
    'songId'(value) {
      console.log(123, value)
      this.getLyric(value)
    },
  },
  // 方法集合
  methods: {
    ...mapMutations(['updateCurrentTime']),
    // 获取歌曲歌词
    async getLyric(id) {
      let res = await getSongLyric(id);

      if (res.status !== 200) {
        this.$notify.error({
          title: '错误',
          message: '数据请求失败'
        });
      }

      this.lyricInfos = res.data.lrc

      const lyricString = res.data.lrc.lyric
      let lyricTransString = ""
      try {
        lyricTransString = res.data.tlyric.lyric
        if (!lyricTransString) {
          this.isTransText = false
        } else {
          this.isTransText = true
        }
      } catch (error) {
        console.log("")
      }

      const lyrics = parseLyric(lyricString)

      const transLyrics = parseLyric(lyricTransString) // 翻译歌词
      for (let i = 0; i < transLyrics.length; i++) {
        let index = lyrics.findIndex((value) => value.time == transLyrics[i].time)

        if (index === -1) {
          console.log("")
        } else {
          lyrics[index]["transText"] = transLyrics[i].text
        }


      }

      // 删除空白歌词
      for (let i = 0; i < lyrics.length; i++) {
        if (!lyrics[i].text) {
          lyrics.splice(i, 1);
        }
      }
      if (lyrics === undefined) {
        this.lyricInfos = []
      } else {
        this.lyricInfos = lyrics
      }
    },

    // 当前播放时间位置
    // timeupdate() {
    //   // console.log(e);
    //   // console.log(this.$refs.audioPlayer.currentTime);
    //   // 节流
    //   let time = this.$refs.audioPlayer.currentTime;
    //   // 将当前播放时间保存到vuex  如果保存到vuex这步节流,会导致歌词不精准,误差最大有1s
    //   this.updateCurrentTime(time);
    //
    //   time = Math.floor(time);
    //   // if (time !== lastSecond) {
    //   //   // console.log(time);
    //   //   lastSecond = time;
    //   //
    //   //   // console.log(this.timeProgress);
    //   // }
    //   this.currentTime = time;
    //   console.log(time)
    // },

    //判断滚动方向，因为此demo中只有四页，故边界处理为 0 与 3
    handleScroll(e){
      // console.log(this.$el.querySelector(".lyrics").scrollTop)
      // let direction = e.deltaY > 0 ? 'down':'up';  //deltaY为正则滚轮向下，为负滚轮向上
      // if(direction==='down'){ //125为用户一次滚动鼠标的wheelDelta的值
      //   // console.log(e.deltaY)
      // }
      // if(direction==='up'){
      //   // let index = this.currentLyricIndex
      //   // this.lyricTransform = `transform: translateY(-${index * 55 + e.deltaY}px)`;
      //   // console.log(index * 55 + e.deltaY)
      //   // console.log(this.lyricTransform)
      // }

    },
    getPageData() {
      this.getLyric(this.$route.query.id)
      // this.getLyric(this.songId)
    },
  }
}
</script>
<style lang="scss" scoped>
.lyrics-scroll {
  height: 500px;
  //overflow: hidden;
}

//.lyrics-scroll::-webkit-scrollbar {
//  display: none;
//}

.lyrics {
  width: 100%;
  height: 500px;
  font-size: 12px;
  text-align: center;
  overflow-y: scroll;
  //overflow: scroll;
}

.lyrics::-webkit-scrollbar {
  display: none;
}

.lyricsItem {
  font-size: 12px;
  /* height: 20px; */
  margin: 25px 20px;
  transition: all 0.5s;
  line-height: 20px;
  color: #f2f2f2;
}

.currentLyric {
  font-weight: 600;
  font-size: 14px;
  color: black;

}

.lyric-active {
  color: #42b983;
  font-size: 18px;
}

.placeholder {
  width: 100%;
  height: 10%;
}

</style>
