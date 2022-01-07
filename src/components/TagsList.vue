<template>
  <div class="tagslist">
    <div class="title">
      <slot></slot>
      <span v-for="(item, index) in playListTags" :key="item.id"
            :class="index == playListIndex ? 'active' : ''" @click="choosePlayListType(index)">
          {{ item.name }}
        </span>
      <span class="refresh" @click="refreshPlayList">
          <i class="el-icon-refresh-left"></i> 换一批
        </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tags-list',
  props: ['title', 'playListTags', 'playListIndex', 'refreshPlayList', 'choosePlayListType'],
  data() {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.title {
  padding: 20px 0 0;
  text-align: center;

  h3 {
    padding: 20px 0;
    font-size: 28px;
    font-weight: 700;

    &.active {
      position: relative;
      font-weight: 600;
      color: #000;

      &:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 1px;
        width: 100%;
        height: 6px;
        background: rgb(142, 184, 233);
        z-index: -1;
      }
    }
  }

  span {
    display: inline-block;
    font-size: 16px;
    margin: 0 24px;
    color: #333;
    cursor: pointer;

    &.active {
      position: relative;
      font-weight: 600;
      color: #000;

      &:after {
        position: absolute;
        content: "";
        left: 0;
        bottom: 1px;
        width: 100%;
        height: 6px;
        background: rgb(142, 184, 233);
        z-index: -1;
      }
    }
  }

  span:hover {
    color: #31c27c;

  }

}
</style>
