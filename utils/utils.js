export default {
    // 播放量格式化
    formatCount(count) {
        let counter = parseInt(count) // 转为 int 类型
        if (counter > 99999999) {
            return (counter / 100000000).toFixed(1) + '亿'
        } else if (counter > 9999) {
            return (counter / 10000).toFixed(1) + '万'
        } else {
            return counter + ''
        }
    },

    // 时间毫秒格式化处理 2022-01-06 09:30:00
    formartDate (originVal, fmt) {
        const dt = new Date(originVal)
        const opt = {
            yyyy: dt.getFullYear(),
            MM: (dt.getMonth() + 1 + '').padStart(2, '0'),
            dd: (dt.getDate() + '').padStart(2, '0'),
            HH: (dt.getHours() + '').padStart(2, '0'),
            mm: (dt.getMinutes() + '').padStart(2, '0'),
            ss: (dt.getSeconds() + '').padStart(2, '0')
        }

        for (const k in opt) {
            const ret = new RegExp('(' + k + ')').exec(fmt)
            if (ret) {
                fmt = fmt.replace(ret[1], opt[k])
            }
        }

        return fmt
    },

    // 歌曲毫秒格式化处理 03:30
    formatSongTime (duration = 0) {
        duration = duration / 1000
        const m = (Math.floor(duration / 60) + '').padStart(2, '0')
        const s = (Math.floor(duration % 60) + '').padStart(2, '0')
        return `${m}:${s}`
    },
}