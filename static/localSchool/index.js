// 1. 获取屏端的学校播放数据
// 2. 筛选出是否有今天的播放内容
// 3. 判断月分和日期
// 4. 

const school = new Vue({
    el: "#root",
    data: {
        timer: null, //定时器
        channelname: "", //栏目名称
        contents: [], //正在播放的栏目内容
        contentsIndex: 0,
        showtype: null, //展示形式 
        priority: 5, //优先级 从1-5 1为最低优先级
        scrolltype: null, //滚动类型
        validtype: 1, //有效期
        playchannel: [], //播放数据
    },
    methods: {
        //获取本地年月日时分秒
        getNowDate(num) {
            let d = new Date();
            //年
            let year = d.getFullYear();
            //月
            let mouth = d.getMonth() + 1;
            //日
            let day = d.getDate();
            //时
            let hours = d.getHours();
            //分
            let minutes = d.getMinutes();
            //秒
            let seconds = d.getSeconds();

            if (mouth >= 1 && mouth <= 9) {
                mouth = '0' + mouth;
            }
            if (day >= 1 && day <= 9) {
                day = '0' + day;
            }
            if (minutes >= 1 && minutes <= 9) {
                minutes = "0" + minutes;
            }
            if (seconds >= 1 && seconds <= 9) {
                seconds = "0" + seconds;
            }
            if (num && num === 1) {
                return year + "-" + mouth + "-" + day;
            } else {
                return hours + ":" + minutes + ":" + seconds;
            }
        },
        //获取学校播放列表
        getContent: function () {
            let that = this;
            axios.get('./channels.json', {}).then(function (response) {
                that.playchannel = response.data.playchannel;
                that.getChannel();
            }).catch(function (error) {
                return error;
            })
        },
        //根据时间获取栏目内容
        getChannel: function () {
            let that = this;
            let result = this.getNowDate(1);
            let s = this.getNowDate();
            let playchannel = this.playchannel;
            for (let i = 0; i < playchannel.length; i++) {
                let channels = playchannel[i];
                let validstarttime = channels.validstarttime;
                let validendtime = channels.validendtime;
                let playstarttime = channels.playstarttime;
                let playendtime = channels.playendtime;
                if (validstarttime == result) {
                    if (s >= playstarttime && s <= playendtime) {
                        let i = 0;
                        while (i < 5) {
                            i++;
                            if (i === channels.priority) {
                                break;
                            }
                            let scrolltype = channels.scrolltype; //滚动类型 0-非滚动 1-滚动
                            if (scrolltype === 0) {
                                let contents = channels.contents;
                                let channelname = channels.channelname;
                                this.$nextTick(function () {
                                    this.contents = contents;
                                    this.channelname = channelname;
                                });
                            }
                        }
                    }
                }
            }
        },
        swiperInit: function () {
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: {
                    delay: 5000,
                },
                loop: true,
            })
        },
        init: function () {
            this.getContent();
        },
    },
    mounted: function () {
        this.init();
    },
    updated: function () {
        this.swiperInit();
    }
});