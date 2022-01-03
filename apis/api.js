import instance from './instance'

// 首页轮播图
const getBanner = params => {
    return instance({
        url: '/banner',
        method: 'get',
        params: params
    })
};

export {
    getBanner,
}