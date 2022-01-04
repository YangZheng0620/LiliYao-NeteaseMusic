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
}

export default getters