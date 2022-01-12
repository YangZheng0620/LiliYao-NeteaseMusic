<template>
  <div class="song-item-v1">
    <router-link :to="{ path: 'demo', query: { id: item.id }}" class="playListImg"
                 active-class="is-active">
      <el-image :src="item.coverImgUrl" lazy class="text">
        <div slot="placeholder" class="image-slot">
          <i class="iconfont icon-placeholder"></i>
        </div>
      </el-image>
      <div class="cover">
        <el-image class="coverPlayer" :src="require('@/assets/player.png')" lazy></el-image>
      </div>
      <span class="playCount">
          <i class="el-icon-service"></i>
          <em>{{$utils.formatCount(item.playCount)}}</em>
        </span>
    </router-link>
    <div class="info">
      <router-link to="/index" class="info_name">{{item.name}} </router-link>
      <div class="tags">
        <router-link to="/index" class="tag" v-for="(tag, index) in item.tags" :key="index">
          #{{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'song-item-v1',
  props: ['item'],
  data() {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.song-item-v1 {

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

  .tags {
    padding: 5px 0;
    .tag {
      font-size: 12px;
      color: #42b983;
    }
  }
}


</style>
