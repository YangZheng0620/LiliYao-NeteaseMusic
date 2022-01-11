<template>
  <div class="playlist">
    <div class="item" v-for="item in playList" :key="item.id">
      <song-item-v1 :item="item"></song-item-v1>
    </div>
  </div>
</template>

<script>
import SongItemV1 from "@/components/SongItemV1";

export default {
  name: 'play-list',
  props: ['playList'],
  components: {
    SongItemV1,
  },
  data() {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 0;
  padding: 0 100px;


}

.item {
  width: 18%;
  padding: 20px 2% 30px 0;
  margin-right: -22px;
}

</style>
