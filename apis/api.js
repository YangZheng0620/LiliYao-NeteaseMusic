import instance from './instance'

// 首页轮播图
const getBanner = params => {
    return instance({
        url: '/banner',
        method: 'GET',
        params: params
    })
};

// 登录
const login = params => {
    return instance({
        url: '/login/cellphone',
        method: 'GET',
        params: params
    })
};

// 获取用户详情信息
const getUserInfo = params => {
    return instance({
        url: '/user/detail',
        method: 'GET',
        params: params
    })
}

// 退出登录
const logout = () => {
    return instance({
        url: '/logout',
        method: 'GET',
    })
}


// 获取歌单
const playlist = (params) => {
    return instance({
        url: '/top/playlist',
        method: 'GET',
        params: params
    })
}

// 获取热门歌单分类
const hotplaylist = () => {
    return instance({
        url: '/playlist/hot',
        method: 'GET',
    })
}

// 获取每日推荐歌单
const recommendplaylist = () => {
    return instance({
        url: '/recommend/resource',
        method: 'GET',
        withCredentials: true,

    })
}

// 获取搜索建议
const getSearchSuggest = (params) => {
    return instance({
        url: '/search/suggest',
        method: 'GET',
        params: params

    })
}

// 获取热门榜单
const getSearchHotSongs = () => {
    return instance({
        url: '/search/hot/detail',
        method: 'GET',

    })
}

// 获取热门精品歌单
const getHighQualityAlbum = (limit = 20, cat = 'ACG') => {
    return instance({
        url: '/top/playlist/highquality',
        method: 'GET',
        params: {
            limit,
            cat
        }
    })
}

// 获取歌单简介
const getPlayListDesc = (id) => {
    return instance({
        url: '/playlist/detail',
        method: 'GET',
        params: {
            id
        }
    })
}

// 获取用户详情
const getUserDetail = (uid) => {
    return instance({
        url: '/user/detail',
        method: 'GET',
        params: {
            uid
        }
    })
}

export {
    getBanner,
    login,
    getUserInfo,
    logout,
    playlist,
    hotplaylist,
    recommendplaylist,
    getSearchSuggest,
    getSearchHotSongs,
    getHighQualityAlbum,
    getPlayListDesc,
    getUserDetail
}