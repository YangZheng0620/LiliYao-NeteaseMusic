<template>
  <div class="demo">
    <el-row class="wrapper">
      <!-- logo -->
      <el-col :span="2" class="right">

      </el-col>
      <el-col :span="5" class="left">
        <div>
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <div class="hotAlbumMenu">
                  <img src="@/assets/navHeader/playlist.png" alt="">
                  <span>热门歌单</span>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="index.toString()" class="hotAlbum" v-for="(item, index) in highQualityAlbumList"
                              :key="item.id" @click="getAlbumID(item.id)">
                  <img :src="item.coverImgUrl" alt="">
                  <div class="text">
                    <span class="name">{{ item.name }}</span>
                    <span>
                      <span class="by">by</span>
                      <span class="nickname">{{ item.creator.nickname }}</span></span>
                  </div>

                </el-menu-item>

              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>

      </el-col>
      <!-- 导航栏列表 -->
      <el-col :span="15" class="middle">
        <play-list-detail :albumID="albumID"></play-list-detail>
      </el-col>
      <!-- 登录按钮 -->
      <el-col :span="2" class="right">

      </el-col>
    </el-row>
  </div>
</template>


<script>
import PlayListDetail from "@/components/PlayListDetail";
import { getHighQualityAlbum } from '/apis/api'

export default {
  name: 'Demo',
  components: {
    PlayListDetail
  },
  data() {
    return {
      albumID: 0,
      highQualityAlbumList: [], // 精品歌单数据
    }
  },
  methods: {
    // 获得热门精品歌单
    async getHighQualityPlayList() {
      try {
        let tags = ['华语','欧美','韩语','日语','粤语','另类/独立','R&B/Soul','怀旧','小语种',
          '学习','夜晚','运动','ACG','影视原声','流行','性感','摇滚','英伦',
          '后摇','古风','民谣','蓝调','乡村','浪漫','快乐','经典','世界音乐',
          '轻音乐','电子','器乐','说唱','古典','爵士',];

        let tag = tags[Math.floor(Math.random() * tags.length)];
        let res = await getHighQualityAlbum(10, tag);
        if (res.status !== 200) {
          console.log('数据请求失败')
        }

        this.highQualityAlbumList = res.data.playlists
      } catch (error) {
        console.log(error)
      }
    },
    // 获得歌单 ID
    getAlbumID (id) {
      this.$router.push({path:'/demo',query: {id:id}})
    },

  },
  mounted() {
    this.getHighQualityPlayList()
  }

}
</script>


<!--<style lang="css">-->
<!--.left .hotAlbum .text{-->
<!--  display: block;-->
<!--  overflow: hidden;-->
<!--  text-overflow:ellipsis;-->
<!--  white-space:nowrap;-->
<!--  width: 180px;-->
<!--}-->
<!--</style>-->

<style lang="scss" scoped>

.left {
  background: #42b983;
  height: 1000px;
  .hotAlbumMenu {
    img {
      margin-right: 3px;
    }
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .hotAlbum {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-left: 20px!important;
    margin-bottom: 20px;
    overflow: hidden;
    img {
      height: 50px;
      width: 50px;
      border-radius: 6px;
      margin-right: 8px;
    }
    .text {
      text-align: left;
      overflow: hidden;
      .name {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
      }
      span {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        .by {
          display: inline-block;
          font-size: 12px;
          color: #999999;
          margin-right: 3px;
        }
        .nickname {
          display: inline-block;
        }
      }
    }

  }
}

.middle {
  background: #99a9bf;
  height: 1000px;
}

.right {
  background: #2c3e50;
  height: 1000px;


}

</style>