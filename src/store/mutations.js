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

}

export default mutations