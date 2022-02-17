const state = {
    loginDialogVisible: false, // 登录弹窗的显示与隐藏
    isLogin: false, // 用户是否登录
    userInfo: null, // 登录用户的详细信息
    recommendPlayList: [], // 每日推荐歌单列表
    musicUrl: '', // 歌曲 url,
    isPlay: true, // 歌曲是否在播放
    currentTime: 0, // 实时播放时长
}

export default state