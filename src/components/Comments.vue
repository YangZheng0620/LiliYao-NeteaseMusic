<template>
  <div class='comments'>
<!--    <div class='comments' v-infinite-scroll="load"-->
<!--         infinite-scroll-disabled="disabled">-->
    <div class="comment_title">
      <h2>评论</h2>
      <em>共620条评论</em>
    </div>
<!--    <div class="userInfo">-->
<!--      <span>Liyuu</span>-->
<!--      <el-avatar shape="circle" size="medium" class="userAvatar"-->
<!--                 src="http://p4.music.126.net/N5bF7cT03c_0dDTLVG1JbQ==/109951166860679554.jpg?param=30y30"/>-->
<!--      <el-form label-width="80px" class="userForm">-->
<!--        <el-form-item>-->
<!--          <el-input></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary">立即创建</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
    <div class="comment-area">
      <div class="hot-comment">
        <div class="hot-title">
          <span>精彩评论</span>
        </div>
        <div class="hot-area">

          <div class="hot-area-item" v-for="(item, index) in albumCommentList.comments"
               :key="index">
            <div class="user-avatar">
              <el-avatar shape="circle" size="medium" class="userAvatar"
                         :src="item.user.avatarUrl"/>
            </div>
            <div class="left">
                <div class="user-name">
                  {{ item.user.nickname }}
                  <el-image class="img" v-if="item.user.vipRights" :src="vipRights(item.user.vipRights.redVipLevel)" alt=""></el-image>
                </div>
                <div class="comment-date">{{ $utils.formatDate(item.time / 1000) }}</div>
                <div class="user-cooment">
                  <span v-html="$utils.formatTextWrap(item.content)"></span>
                </div>
              <div class="bottom">
                <div class="comment-like">like
                  <span v-if="item.likedCount">({{ item.likedCount }})</span>
                </div>
                <div class="comment-reply">reply</div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
<!--    <loading v-if="isLoading"></loading>-->
<!--&lt;!&ndash;    <p v-if="noMore">没有更多了</p>&ndash;&gt;-->
<!--    <no-more v-if="noMore"></no-more>-->
    <el-pagination
        layout="prev, pager, next"
        :total="albumCommentList.total"
        @current-change="demo"
        :current-page.sync="currentPageIndex">
    </el-pagination>
  </div>
</template>

<script>

import Loading from "@/components/Loading";
import NoMore from "@/components/NoMore";

export default {
  name: 'comments',
  components: {
    Loading,
    NoMore,
  },
  props: ['albumCommentList', 'getAlbumComment', 'playlistID'],
  data () {
    // 这里存放数据
    return {
      isLoading: false,
      limit: 10,
      currentPageIndex: 1,
    }
  },
  // 监听属性 类似于data概念
  computed: {
    // disabled () {
    //   return this.isLoading || this.noMore
    // },
    // noMore () {
    //   return this.limit >= 100
    // },

  },
  watch: {
    "playlistID": {
      immediate: true,
      handler() {
        this.currentPageIndex = 1
      },
    },
  },
  // 方法集合
  methods: {
    vipRights(index) {
      switch (index) {
        case 1:
          return '//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922817/9124/a83c/7eb7/6d7d81b608bfb56d7fb286bd8eb72346.png'
        case 2:
          return '//p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922900/5a1b/446b/b722/ec5a532c258824e8b59a45c166195e90.png'

        case 3:
          return '//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922957/d393/4206/8928/a082dd9a7e7bb69e84b138b8df7bbcd0.png'

        case 4:
          return '//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213923065/dc4e/2b9c/7677/20a6644c6e3a093d7accce919ae7b169.png'

        case 5:
          return '//p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213923094/81eb/9288/68a5/a427a0dbf899d616c3f715272a71ee59.png'

        case 6:
          return '//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213923139/f08a/c6ea/10ee/f7e2deef21937a1042e370c47525c956.png'
        default:
          return ''
      }
    },
    demo(index) {
      if (index * 10 > this.albumCommentList.total) {
        let limit = this.albumCommentList.total - ((index-1) * 10)
        this.getAlbumComment(this.playlistID, limit, index - 1)
      } else {
        this.getAlbumComment(this.playlistID, 10, index - 1)
      }

    },
    // load() {
    //   console.log(123)
    //   this.isLoading = true
    //
    //   setTimeout(() => {
    //
    //     this.getAlbumComment(this.playlistID, this.limit)
    //     this.limit += 20
    //     this.isLoading = false
    //   }, 500)
    // },
  },
}
</script>
<style lang="scss" scoped>

.comments {
  padding-top: 30px;

}

.comment_title {
  display: flex;
  align-items: baseline;
  font-size: 0;
  border-bottom: 1px #42b983 solid;
  margin-bottom: 30px;
  h2 {
    display: flex;
    font-size: 24px;
    line-height: 24px;
    font-weight: normal;
    justify-content: left;

  }

  em {
    display: flex;
    justify-content: left;
    padding-left: 20px;
    font-size: 14px;
    line-height: 14px;
    font-style: normal;
    color: #999;
  }

  .userInfo {
    display: flex;
    span {
      display: inline-block;
      line-height: 30px;
      font-size: 14px;
      color: #666;
    }
  }
}


.hot-area-item {
  display: flex;
  border-bottom: 1px #42b983 solid;
  padding: 15px 15px 15px 0;
  .user-avatar {
    margin-right: 15px;
  }
}

.hot-comment {
  display: block;
  text-align: left;

  .hot-title {
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px #42b983 solid;
  }

  .hot-area {
    .left {
      margin-bottom: 20px;

      .user-name {
        color: #999999;
        font-size: 16px;
        font-weight: 400;
        height: 26px;
        line-height: 26px;
        .img {
          height: 12px;
          width: 35px;
        }
      }

      .comment-date {
        color: #999999;
        font-size: 14px;
        height: 26px;
        line-height: 26px;
        margin-bottom: 10px;
      }

      .user-comment {
        font-size: 14px;
        font-weight: 400;
      }
    }

    .bottom {
      display: flex;
      padding-top: 10px;
      .comment-like {
        padding-right: 10px;
      }

      .comment-reply {
      }

    }
  }
}

</style>
