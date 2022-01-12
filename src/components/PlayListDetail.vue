<template>
  <div class="playlist-detail">
    <div class="header">
      <div class="left">
        <el-image class="cover" :src="albumDescList.coverImgUrl" lazy></el-image>
      </div>
      <div class="right">
        <div class="title">
          <div class="tag">歌单</div>
          <div class="titleName">{{ albumDescList.name }}</div>
        </div>
        <div class="creator">
          <el-avatar class="avatar" :src="userDetailInfo.avatarUrl" alt=""></el-avatar>
          <div class="name">
            <span>{{ userDetailInfo.nickname }}</span>
            <span>{{ $utils.formatDate(albumDescList.createTime) }} 创建</span>
          </div>
        </div>
        <div class="buttons">
          <el-button type="primary" round>播放全部</el-button>
          <el-button type="primary" round>收藏 ({{ $utils.formatCount(albumDescList.subscribedCount) }})</el-button>
          <el-button type="primary" round>分享 ({{ $utils.formatCount(albumDescList.shareCount) }})</el-button>
          <el-button type="primary" round>下载全部</el-button>
        </div>
        <div class="tags">
          <span>标签：</span>
          <span v-for="(tag,index) in albumDescList.tags" :key="index">
            #{{ tag }}
          </span>
        </div>
        <div class="songCount">
          <span>歌曲：{{ albumDescList.trackCount }}</span>
          <span>播放：{{ $utils.formatCount(albumDescList.playCount) }}</span>
        </div>
        <div class="songDesc">
          <el-collapse>
            <el-collapse-item title="简介" name="1">
              <div>{{ albumDescList.description }}</div>
            </el-collapse-item>
          </el-collapse>

        </div>
      </div>

    </div>
    <div class="songsList">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">用户管理</el-tab-pane>
        <el-tab-pane :label="`评论(${albumDescList.commentCount})`" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="收藏者" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// import SongItemV1 from "@/components/SongItemV1";

import {getPlayListDesc, getUserDetail} from "../../apis/api";

export default {
  name: 'play-list-detail',
  props: ['albumID'],
  components: {
  },
  data() {
    return {
      albumDescList: [], // 歌单简介信息
      userDetailInfo: [], // 用户详情
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获得歌单简介
    async getAlbumDesc(id) {
      try {

        let res = await getPlayListDesc(id);
        if (res.status !== 200) {
          console.log('数据请求失败')
        }

        let uid = res.data.playlist.userId

        let userDetail = await getUserDetail(uid);

        if (userDetail.status !== 200) {
          console.log('数据请求失败')
        }

        this.albumDescList = res.data.playlist
        this.userDetailInfo = userDetail.data.profile
      } catch (error) {
        console.log(error)
      }
    },
  },
  watch: {
    // 监控路由中参数的变化
    "$route.query.id": {
      immediate: true,
      handler(newVal) {
        this.getAlbumDesc(newVal);
      },
    },
  },
  mounted() {
    this.getAlbumDesc(this.$route.query.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.header {
  display: flex;
  height: 300px;
  background: #999999;
  .left {
    display: flex;
    align-items: center;
    width: 30%;
    background: #00DBDE;
    .cover {
      margin: 20px;
      border-radius: 6px;
    }
  }
  .right {
    width: 70%;
    background: #9599E2;
    padding: 30px;
    .title {
      display: flex;
      font-weight: 700;
      font-size: 26px;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      .tag {
        color: #ec4141;
        font-size: 12px;
        border: 1px #ec4141 solid;
        height: 22px;
        line-height: 22px;
        width: 36px;
        border-radius: 4px;
        margin-right: 8px;
      }
    }

    .creator {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avatar {
        height: 30px;
        width: 30px;
        margin-right: 5px;
      }
      .name {
        span {
          margin-right: 5px;
        }
      }
    }

    .buttons {
      display: flex;
      margin-bottom: 10px;
    }

    .tags {
      display: flex;
      margin-bottom: 10px;
    }

    .songCount {
      display: flex;
      margin-bottom: 10px;
      span {
        margin-right: 20px;
      }
    }

    .songDesc {

    }
  }
}

.songsList {
  height: 500px;
  background: #8BC6EC;
  padding: 40px;
  // 标签总横线长度
  /deep/ .el-tabs__nav-wrap:after {
    width: 0px;
  }
  // 标签激活横线样式
  /deep/ .el-tabs__active-bar {
    background-color: #42b983;
  }
  // 标签激活文字样式
  /deep/ .el-tabs__item.is-active {
    font-weight: 700;
  }
}

</style>
