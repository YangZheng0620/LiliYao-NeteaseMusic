const getters = {
    // 类似于 computed 属性
    loginDialogVisible(state) {
        return state.loginDialogVisible
    },
    // 登录状态
    isLogin(state) {
        // 保持登录状态，全部为否才算退出登录
        return state.isLogin || JSON.parse(window.sessionStorage.getItem('isLogin'))
    },
    // 用户信息
    userInfo (state) {
        return state.userInfo || JSON.parse(window.sessionStorage.getItem('userInfo'))
    },
    // 歌曲 Url
    getMusicUrl (state) {
        return state.musicUrl
    },
    // 歌曲是否在播放
    isPlay (state) {
        return state.isPlay
    },
    // 获取歌曲当前时间
    songCurrentTime (state) {
        return state.currentTime
    },
    // 获取歌曲信息
    songDetail (state) {
        return state.songDetail
    },
    // 获取歌曲信息
    playListSongs (state) {
        return state.playListSongs
    },
    playListIndex (state) {
        return state.playListIndex
    },
    songId (state) {
        return state.songId
    },
}

export default getters