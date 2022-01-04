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
        method: 'get',
        params: params
    })
}

// 退出登录
const logout = () => {
    return instance({
        url: '/logout',
        method: 'get',
    })
}

export {
    getBanner,
    login,
    getUserInfo,
    logout
}