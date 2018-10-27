var vm = new Vue({
    el: "#root",
    data: {
        timer: null, //内容定时器
        currChannelPlay: -1, //当前正在播放的栏目
        currChannelPlaying: -1,
        imgduration: 0, //每张图片播放的是长
        duration: 0, //单条内容时长
        contentsLen: 0, //每个栏目下有多少条内容
        currContent: 0, //当前正在显示的内容
        channelData: [] //栏目数据
    },
    methods: {
        //补0操作
        fill: function (i) {
            if (i >= 1 && i <= 9) {
                i = "0" + i;
            }
            return i;
        },
        //获取本地年月日时分秒
        getNowDate: function (arg) {
            var d = new Date();
            //年
            var year = d.getFullYear();
            //月
            var mouth = this.fill(d.getMonth() + 1);
            //日
            var day = this.fill(d.getDate());
            //时
            var hours = this.fill(d.getHours());
            //分
            var minutes = this.fill(d.getMinutes());
            //秒
            var seconds = this.fill(d.getSeconds());

            if (arguments.length) {
                return year + "-" + mouth + "-" + day;
            } else {
                return hours + ":" + minutes + ":" + seconds;
            }
        },
        //根据日期时间获取需要播放的栏目
        getRunPlayChannel: function () {
            var that = this;
            var channelData = this.channelData;
            var ymd = this.getNowDate(1);
            var hms = this.getNowDate();
            var priorityArr = []; //优先级
            for (var i = 0; i < channelData.length; i++) {
                var channels = channelData[i]; //每个栏目
                var validstarttime = channels.validstarttime;
                var playstarttime = channels.playstarttime;
                var playendtime = channels.playendtime;
                //如果今天有要播放的栏目
                if (ymd == validstarttime) {
                    //当前时间hh:mm:ss是否在播放开始时间和结束时间内
                    if (hms >= playstarttime && hms <= playendtime) {
                        //如果存在多个栏目，那么保存栏目优先级
                        priorityArr.push(channels.priority);
                        //console.log("有栏目要播放了！");
                    } else {
                        //如果当前时间没有要播放的栏目，那么随机播放视频
                        //console.log("没有栏目要播放了！");
                    }
                }
            }
            if (priorityArr.length) {
                //简单的排序
                var prioritySort = priorityArr.sort();
                var copy = [];
                var priorityMax = prioritySort[prioritySort.length - 1];
                var getChannel;
                //找出优先级最高的栏目
                channelData.forEach(function (elem, index) {
                    if (elem.priority === priorityMax) {
                        copy.push(elem);
                    }
                });
                //说明有多个优先级一样的栏目
                if (copy.length > 1) {
                    //那么就取第一个栏目播放
                    getChannel = copy[0];
                } else {
                    getChannel = copy[0];
                }
                //显示栏目
                this.currChannelPlay = channelData.findIndex(function (elem) {
                    return elem.channelname === getChannel.channelname; //找出相同的栏目名称
                });
                if (this.currChannelPlaying == this.currChannelPlay) {
                    return;
                } else {
                    this.currChannelPlaying = this.currChannelPlay;
                    this.runPlayChannelContents(getChannel.contents);
                }
            }
        },
        //播放栏目的内容
        runPlayChannelContents: function (contents) {
            var that = this;
            var durationArr = []; //时长
            if (Array.isArray(contents)) {
                for (var i = 0; i < contents.length; i++) {
                    var single = contents[i]; //每条内容数据
                    durationArr.push(single.duration); //保存每条内容的时长
                }
                this.contentsLen = durationArr.length;
                if (durationArr.length > 0) {
                    this.currContent = 0;
                    this.duration = durationArr[this.currContent];
                    if (this.timer != null) {
                        clearInterval(this.timer);
                        this.currContent = 0;
                    }
                    this.timer = setInterval(function () {
                        that.changeContens(durationArr); // 传入内容时长
                    }, 1000);
                    console.log("timer:" + this.timer);
                }
            }
        },
        //切换内容
        changeContens: function (durationArr) {
            //时长还在走
            if (this.duration > 0) {
                this.duration = this.duration - 1;
                console.log(this.duration);
            } else {
                if (this.currContent < this.contentsLen) {
                    this.currContent++;
                    this.duration = durationArr[this.currContent];
                } else {
                    //clearInterval(this.timerC);
                    this.currContent = 0;
                    this.duration = durationArr[this.currContent];
                }
            }
        },
        //获取学校播放列表
        getPlayChannel: function () {
            var that = this;
            axios.get('./channels.json', {}).then(function (response) {
                that.$nextTick(function () {
                    this.channelData = response.data.playchannel;
                    this.getRunPlayChannel();
                });
            }).catch(function (error) {
                return error;
            })
        },
        swiperInit: function () {
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: {
                    delay: 5000,
                },
                loop: true,
            })
        },
    },
    mounted: function () {
        var that = this;
        this.getPlayChannel();
        //定时器
        setInterval(function () {
            console.log("10")
            that.getRunPlayChannel()
        }, 5000)
    },
    updated: function () {
        this.swiperInit();
    }
});