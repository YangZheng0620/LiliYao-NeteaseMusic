<template>
  <div class='comments'>
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

          <div class="hot-area-item">
            <div class="user-avatar">
              <el-avatar shape="circle" size="medium" class="userAvatar"
                         src="http://p4.music.126.net/N5bF7cT03c_0dDTLVG1JbQ==/109951166860679554.jpg?param=30y30"/>
            </div>
            <div class="left">
              <div class="user">
                <div class="user-name">Liyuu</div>
                <div class="user-cooment">
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                </div>
              </div>
              <div class="bottom">
                <div class="comment-date">2022-01-13</div>
                <div class="comment-like">like</div>
                <div class="comment-reply">reply</div>
              </div>
            </div>


          </div>
          <div class="hot-area-item">
            <div class="user-avatar">
              <el-avatar shape="circle" size="medium" class="userAvatar"
                         src="http://p4.music.126.net/N5bF7cT03c_0dDTLVG1JbQ==/109951166860679554.jpg?param=30y30"/>
            </div>
            <div class="left">
              <div class="user">
                <div class="user-name">Liyuu</div>
                <div class="user-cooment">
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                </div>
              </div>
              <div class="bottom">
                <div class="comment-date">2022-01-13</div>
                <div class="comment-like">like</div>
                <div class="comment-reply">reply</div>
              </div>
            </div>


          </div>
          <div class="hot-area-item">
            <div class="user-avatar">
              <el-avatar shape="circle" size="medium" class="userAvatar"
                         src="http://p4.music.126.net/N5bF7cT03c_0dDTLVG1JbQ==/109951166860679554.jpg?param=30y30"/>
            </div>
            <div class="left">
              <div class="user">
                <div class="user-name">Liyuu</div>
                <div class="user-cooment">
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                  <span>：第一句就沦陷了 这妹子的声音让我少女心泛滥！！！卧槽卧槽卧槽！！！我也是妹子啊这不科学！！！</span>
                </div>
              </div>
              <div class="bottom">
                <div class="comment-date">2022-01-13</div>
                <div class="comment-like">like</div>
                <div class="comment-reply">reply</div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comments',
  components: {},
  props: [],
  data () {
    // 这里存放数据
    return {
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
  }
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
  margin-bottom: 50px;
  border-bottom: 1px #42b983 solid;
}

.hot-comment {
  display: block;
  text-align: left;

  .hot-title {
    font-weight: 700;
    font-size: 16px;
    border-bottom: 1px #42b983 solid;
    margin-bottom: 20px;
  }

  .hot-area {
    .user {
      display: flex;
      margin-bottom: 20px;
    }

    .bottom {
      display: flex;

      .comment-date {
        flex: 1;
        margin-right: auto;
      }

      .comment-like {
        padding-right: 10px;
      }

      .comment-reply {
      }

    }
  }
}

</style>
