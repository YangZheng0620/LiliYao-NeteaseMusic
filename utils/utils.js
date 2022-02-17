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

    // 时间戳格式化
    formatDate(time) {
        if (!time) return
        // 判断时间戳是否为 13 位数，如果不是则 * 1000
        // 时间戳只有 13 位数(带毫秒)和 10 位数(不带毫秒)的
        let newTime = 0
        if (time.toString().length == 13) {
            newTime = new Date(time);
        } else {
            newTime = new Date(time * 1000);
        }

        let year = newTime.getFullYear();
        let month = (newTime.getMonth() + 1 < 10 ? '0' + (newTime.getMonth() + 1) : newTime.getMonth() + 1);
        let day = newTime.getDate();
        let hour = this.padLeftZero(newTime.getHours());
        let minute = this.padLeftZero(newTime.getMinutes());
        let second = this.padLeftZero(newTime.getSeconds());
        let formatTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second


        return formatTime
    },

    //补零操作
    padLeftZero (time) {
        time = time + '' // 将时间变为字符串，用来获取字符串长度
        // 例如 6 的长度为 1，那么 006 截取一位，则获得 06
        return ('00' + time).slice(time.length)
    },

    // 歌曲毫秒格式化处理 03:30
    formatSongTime (duration = 0) {
        duration = duration / 1000
        const m = (Math.floor(duration / 60) + '').padStart(2, '0')
        const s = (Math.floor(duration % 60) + '').padStart(2, '0')
        return `${m}:${s}`
    },

    // 评论文字换行效果
    formatTextWrap (str) {
        let text = str.replace(/\n/g, '<br/>')
        return text
    },


}

export function returnSecond(time) {
    time = time.split(":")
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);
    return m * 60 + s;
}