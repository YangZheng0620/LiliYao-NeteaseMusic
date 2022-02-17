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

}

export default mutations