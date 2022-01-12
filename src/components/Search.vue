<template>
  <div class="search">
    <template v-if="searchSuggestList.length === 0">
      <div class="hotHeader">热搜榜</div>
      <div class="hotItem">
        <div class="hotSongs" v-for="(item, index) in searchHotSongsList" :key="item.searchWord">
          <div class="hotIndex" :class="activeNumList.includes(index + 1) ? 'hotActiveIndex' : ''">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="hotSong" :class="activeNumList.includes(index + 1) ? 'hotActiveSong' : ''">
                  <span>
                    {{ item.searchWord }}
                    <img v-if="item.iconUrl" :src="item.iconUrl" alt="">
                  </span>
            <span class="hotContent">{{ item.content }}</span>
          </div>

        </div>
      </div>

    </template>
    <template v-else>
      <div class="userHeader">
        搜 “{{searchKeywords}}” 相关用户
        <img src="@/assets/navHeader/arrow-right.png" alt="">
      </div>
      <div class="searchItem">
        <div class="songs" v-if="searchSuggestList.songs">
          <div class="songsIcon">
            <img src="@/assets/navHeader/music.png" alt="">
            单曲
          </div>
          <div class="songsItems">
                  <span class="songsItem" v-for="songs in searchSuggestList.songs" :key="songs.id">
                    {{songs.name}}
                    <span v-if="songs.transNames"> ({{ songs.transNames[0] }})</span>
                    <span v-if="songs.artists"> - {{ songs.artists[0].name }}</span>
                  </span>
          </div>
        </div>
        <div class="songs" v-if="searchSuggestList.artists">
          <div class="songsIcon">
            <img src="@/assets/navHeader/singer.png" alt="">
            歌手
          </div>
          <div class="songsItems">
                  <span class="songsItem" v-for="artists in searchSuggestList.artists" :key="artists.id">
                    {{artists.name}}
                    <span v-if="artists.alia"> ({{ artists.alia[0] }})</span>
                  </span>
          </div>
        </div>
        <div class="songs" v-if="searchSuggestList.albums">
          <div class="songsIcon">
            <img src="@/assets/navHeader/album.png" alt="">
            专辑
          </div>
          <div class="songsItems">
                  <span class="songsItem" v-for="albums in searchSuggestList.albums" :key="albums.id">
                    {{albums.name}}
                    <span v-if="albums.artist">
                      - {{ albums.artist.name }}
                    </span>
                  </span>
          </div>

        </div>
        <div class="songs" v-if="searchSuggestList.playlists">
          <div class="songsIcon">
            <img src="@/assets/navHeader/playlist.png" alt="">
            歌单
          </div>
          <div class="songsItems">
                  <span class="songsItem" v-for="playlists in searchSuggestList.playlists" :key="playlists.id">
                    {{playlists.name}}
                  </span>
          </div>

        </div>
      </div>

    </template>
  </div>
</template>

<script>

export default {
  name: 'search',
  props: ['searchHotSongsList', 'searchSuggestList', 'activeNumList', 'searchKeywords'],
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>

// 热搜榜样式
.hotHeader {
  font-size: 24px;
  margin-bottom: 10px;
}

.hotItem {
  overflow: auto;
  height: 400px;
  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  .hotSongs {
    display: flex;
    margin-bottom: 8px;
    .hotIndex {
      display: flex;    /*实现垂直居中*/
      align-items: center;    /*实现水平居中*/
      justify-content: center;
      flex-basis: 15%;
      height: 50px;
      font-size: 18px;
      font-weight: 400;
    }
    .hotActiveIndex {
      font-weight: 700;
      color: rgb(194, 12, 12);
    }
    .hotSong {
      flex-basis: 90%;
      width: 200px;
      overflow:hidden;
      span:first-of-type {
        font-size: 16px;
        font-weight: 400;
        display: block;
        color: #333333;
        img {
          height: 14px;
          width: 22px;
        }
      }
      .hotContent {
        display: block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      span {

        color: #999999;
      }
    }
    .hotActiveSong {
      span:first-of-type {
        font-weight: 700;
        color: #333333;
      }
    }
    &:hover {
      background: #f2f2f2;
    }

  }

}

// 搜索建议样式
.userHeader {
  display: flex;
  border-bottom: 2px #f2f2f2 solid;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  line-height: 40px;
  align-items: center;
  img {
    height: 25px;
  }
  &:hover {
    color: #42b983;
  }
}

.searchItem {
  .songs {
    display: flex;
    border-bottom: 1px #f2f2f2 solid;
    .songsIcon {
      display: flex;    /*实现垂直居中*/
      align-items: center;    /*实现水平居中*/
      justify-content: center;
      border-right: 2px #f2f2f2 solid;
      flex-basis: 20%;
      img {
        width: 22px;
        height: 20px;
        padding-right: 2px;
      }
    }
    .songsItems {
      display: flex;
      flex-direction: column;
      flex-basis: 80%;

      .songsItem {
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 250px;
        font-size: 16px;
      }

      .songsItem:hover {
        color: #42b983;
        cursor: pointer;
        font-weight: 700;
      }

    }
    &:last-of-type {
      border-bottom: none;
    }
  }

  .artists {
    display: flex;
    .artistsIcon {
      display: flex;    /*实现垂直居中*/
      align-items: center;    /*实现水平居中*/
      justify-content: center;
      border-right: 1px #42b983 solid;
      flex-basis: 30%;
    }
    .artistsItems {
      display: flex;
      flex-direction: column;
      flex-basis: 70%;
      .artistsItem {
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
    }

  }
  .albums {
    display: flex;
    .albumsIcon {
      display: flex;    /*实现垂直居中*/
      align-items: center;    /*实现水平居中*/
      justify-content: center;
      border-right: 1px #42b983 solid;
      flex-basis: 30%;
    }
    .albumsItems {
      display: flex;
      flex-direction: column;
      flex-basis: 70%;
      .albumsItem {
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
    }

  }
}
</style>
