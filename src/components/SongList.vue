<template>
  <div class='song-list'>
    <el-table
        :data="albumSongsList"
        style="width: 100%">
      <el-table-column label="" width="50">
        <template v-slot="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
<!--      <el-table-column label="操作" width="80">-->
<!--        <template v-slot="scope">-->
<!--          {{ scope.$index }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="歌曲" width="200">
        <template v-slot="scope">
          <div class="songName" @click="handleSongListInfo(scope.$index)">
            <router-link :to="{ path: 'song', query: { id: scope.row.id }}"
                         active-class="is-active">
              {{ scope.row.name }}
              <span class="songNameAlia" v-if="scope.row.alia[0]">({{ scope.row.alia[0] }})
              </span>
            </router-link>
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手" width="200">
        <template v-slot="scope">
          <div class="singerName">
            <span v-for="(item, index) in scope.row.ar" :key="index">
            {{ item.name }}
            <span v-if="index !== scope.row.ar.length - 1">/</span>
          </span>
          </div>


        </template>
      </el-table-column>
      <el-table-column label="专辑" width="240">
        <template v-slot="scope">
          <div class="playlistName">
            {{ scope.row.al.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="80">
        <template v-slot="scope">
          {{ $utils.formatSongTime(scope.row.dt) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'song-list',
  components: {},
  props: ['albumSongsList'],
  data () {
    // 这里存放数据
    return {
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    ...mapMutations(['getPlayListSongs', 'getPlayListIndex']),
    handleSongListInfo(index) {
      this.getPlayListIndex(index)
      this.getPlayListSongs(this.albumSongsList)
    },
  }
}
</script>
<style lang="scss" scoped>

.songNameAlia {
  font-size: 12px;
  color: #999999;

}

.songName {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlistName {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.singerName {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
