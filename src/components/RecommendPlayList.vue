<template>
  <div class="recommendplaylist">
    <h3>热门歌单</h3>
    <div class="item">
      <router-link to="/index" class="playListImg"
                   active-class="is-active">
        <el-image src="https://qpic.y.qq.com/music_cover/JOcib8DcZVqmEWnhqic9L7tSaHiaiccgibtFibAxf8nkB8xxBDNgHGRkmRdw/300?n=1" lazy>
          <div slot="placeholder" class="image-slot">
            <i class="iconfont icon-placeholder"></i>
          </div>
        </el-image>
        <div class="cover">
          <el-image class="coverPlayer" :src="require('@/assets/player.png')" lazy></el-image>
        </div>
        <span class="recommendDateBg">
          <b></b><br>
          <b></b>
        </span>
        <span class="recommendDate">
          <b>{{ recommendWeek }}</b><br>
          <b>{{ recommendDay }}</b>
        </span>
      </router-link>
      <div class="info">
        <router-link to="/index" class="info_name">每日歌曲推荐 </router-link>
        <div class="copywriters">
          <router-link to="/index" class="copywriter">
            根据你的口味生成，每天6:00更新
          </router-link>
        </div>
      </div>
    </div>
    <div class="item" v-for="item in recmdPlayList" :key="item.userId">
      <router-link to="/index" class="playListImg"
                   active-class="is-active">
        <el-image :src="item.picUrl" lazy>
          <div slot="placeholder" class="image-slot">
            <i class="iconfont icon-placeholder"></i>
          </div>
        </el-image>
        <div class="cover">
          <el-image class="coverPlayer" :src="require('@/assets/player.png')" lazy></el-image>
        </div>
        <span class="playCount">
          <i class="el-icon-service"></i>
          <em>{{$utils.formatCount(item.playcount)}}</em>
        </span>
      </router-link>
      <div class="info">
        <router-link to="/index" class="info_name">{{item.name}} </router-link>
        <div class="copywriters">
          <router-link to="/index" class="copywriter">
            {{ item.copywriter }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'recommend-play-list',
  props: ['recmdPlayList'],
  data() {
    return {
      recommendDay: 1,
      recommendWeek: '星期五'
    }
  },
  mounted() {
    // 动态显示日期（天）
    let date = new Date()
    let day = date.getDate()
    this.recommendDay = day
    // 动态显示星期
    let weekArray = ["日", "一", "二", "三", "四", "五", "六"];
    let week = weekArray[new Date(date).getDay()]; // 注意此处必须是先 new 一个 Date
    this.recommendWeek = `星期${week}`
  },
  methods: {
    dateFormat() {

    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.recommendplaylist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0;
  padding: 0 100px;


}

.item {
  width: 18%;
  padding: 20px 3% 30px 0;
  margin-right: -22px;

  .playListImg {
    display: block;
    position: relative;
    height: 186px;

    // 歌单背景
    &:after, &:before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: #d9d9d9;
      position: absolute;
      top: 0;
    }

    &:before {
      border: 1px solid #d6d6d6;
      right: -4px;
      -webkit-transform: scale(.85);
      -ms-transform: scale(.85);
      transform: scale(.85);
      -webkit-transform-origin: 100% 50%;
      -ms-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      z-index: 2;
      border-radius: 2px;
      transition: all .4s linear;
    }

    &:after {
      border: 1px solid #c4c4c4;
      right: -8px;
      -webkit-transform: scale(.73);
      -ms-transform: scale(.73);
      transform: scale(.73);
      -webkit-transform-origin: 100% 50%;
      -ms-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
      z-index: 1;
      border-radius: 2px;
      opacity: .5;
      transition: all .4s linear .1s;
    }

    // 歌单列表封面遮罩
    .cover {
      top: 0px;
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      z-index: 3;
      transition: all 2s linear;
      .coverPlayer {
        // 图片水平居中
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        position: absolute;
        opacity: 0;
        height: 0px;
        width: 0px;
        transition: all 1s linear;
      }
    }

  }

  .el-image {
    width: 100%;
    height: 100%;
    z-index: 3;
    border-radius: 6px;
    overflow: hidden;
    /deep/ .el-image__inner {
      width: 100%;
      height: 100%;
      transition: all 1s;

    }
  }

  .playCount {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 4;
    font-size: 12px;
    display: block;
    width: 45%;
    text-align: center;
    color: #fff;
    line-height: 30px;
    border-radius: 0 4px 0 0;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0+0,0.5+97 */
    background: -moz-linear-gradient(left,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 97%, rgba(0,0,0,0.5) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 97%,rgba(0,0,0,0.5) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 97%,rgba(0,0,0,0.5) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#80000000',GradientType=1 ); /* IE6-9 */

    .icon-playnum {
      color: #fff;
    }

    em {
      display: inline-block;
      padding-left: 5px;
      font-style: normal;
    }
  }
  
  // 每日推荐歌曲的背景
  .recommendDateBg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    font-size: 26px;
    display: block;
    width: 50%;
    text-align: center;
    color: #fff;
    line-height: 40px;
    border-radius: 0 0 50px 0;
    background-color: #00DBDE;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#000000+0,000000+100&0+0,0.5+97 */
    background: -moz-linear-gradient(left,  rgba(139, 198, 236,0) 0%, rgba(149, 153, 226,0.5) 97%,rgba(149, 153, 226,0.5) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  rgba(139, 198, 236,0) 0%,rgba(149, 153, 226,0.5) 97%,rgba(149, 153, 226,0.5) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(90deg, rgba(0,219,222,0.5) 0%, rgba(252,0,255, 0.5) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#80000000',GradientType=1 ); /* IE6-9 */

    .icon-playnum {
      color: #fff;
    }

    b {
      display: inline-block;
      padding-left: 5px;
      font-style: normal;
    }
  }

  // 动态显示日期和星期的样式
  .recommendDate {
    position: absolute;
    top: 15px;
    left: 6px;
    z-index: 5;
    font-size: 35px;
    display: block;
    text-align: center;
    width: 60%;
    color: #fff;
    line-height: 40px;
    border-radius: 0 0 50px 0;

    .icon-playnum {
      color: #fff;
    }

    b {
      display: inline-block;
      padding-left: 5px;
      font-style: normal;
    }
  }

  &:hover {
    .playListImg {
      position: relative;

      .el-image {
        // 图片外框不变大，里面中心放大
        /deep/ .el-image__inner {
          transform: scale(1.1); //放大 倍数随意
        }
      }

      .cover {
        transition: all 2s;
        opacity: 1;
      }

      .coverPlayer {
        transition: all 1s;
        opacity: 1;
        height: 100px;
        width: 100px;
      }

      &:after, &:before {
        background: rgb(142, 184, 233);

      }

      &:before {
        right: -6px;
      }

      &:after {
        right: -12px;
      }
    }

    .info_name {
      color: #2d8cf0;
    }
  }

  .info_name {
    display: block;
    color: #000;
    font-size: 16px;
    line-height: 22px;
    margin-top: 15px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  .copywriters {
    padding: 5px 0;
    .copywriter {
      font-size: 12px;
      color: #999;
    }
  }

}
</style>
