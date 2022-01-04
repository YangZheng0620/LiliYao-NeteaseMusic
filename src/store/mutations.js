const mutations = {
    setLoginDialog (state, value) {
        state.loginDialogVisible = value
    },
    setLogin (state, value = false) {
        state.isLogin = value
    },
    setUserInfo (state, value = null) {
        state.userInfo = value
    }

}

export default mutations