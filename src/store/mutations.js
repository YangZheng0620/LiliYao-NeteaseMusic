import {getMusicUrl, getSongDetail} from "../../apis/api";

const mutations = {
    setLoginDialog (state, value) {
        state.loginDialogVisible = value
    },
    setLogin (state, value) {
        state.isLogin = value || JSON.parse(window.sessionStorage.getItem('isLogin'))
    },
    setUserInfo (state, value = null) {
        state.userInfo = value
    },
    setRecommendPlayList (state, value) {
        state.recommendPlayList = value
    },
    setMusicUrl (state, value) {
        state.musicUrl = value
    },
    setMusicIsPlay (state, value) {
        state.isPlay = value
    },
    updateCurrentTime(state, currentTime) {
        state.currentTime = currentTime;
    },
    getSongDetail(state, value) {
        state.songDetail = value;
    },
    getSongId(state, value) {
        state.songId = value;
    },
    getPlayListSongs(state, value) {
        state.playListSongs = value;
    },
    getPlayListIndex(state, value) {
        state.playListIndex = value;
    },
    playMusicWithSongIdAction(state, value) {

        try {

            getMusicUrl(value).then(res => {
                if (res.status !== 200) {
                    console.log('数据请求失败')
                }
                if (this.musicUrl === res.data.data[0].url) return
                state.musicUrl = res.data.data[0].url

                // console.log(res)
            })
            getSongDetail(value).then(res2 => {
                if (res2.status !== 200) {
                    console.log('数据请求失败')
                }
                // this.songDetail= res2.data.songs[0]
                state.songDetail = res2.data.songs[0]

                // console.log(res)
            })

            // let res2 = await getSongDetail(id);
            // if (res2.status !== 200) {
            //     console.log('数据请求失败')
            // }
            //
            // this.songDetail= res2.data.songs[0]
            // this.getSongDetail(res2.data.songs[0])



        } catch (error) {
            console.log(error)
        }
        console.log(value)

    },


}

export default mutations