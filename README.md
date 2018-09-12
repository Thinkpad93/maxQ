> Q 校网业务综合管理后台

```javascript
echo "# maxQ" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Thinkpad93/maxQ.git
git push -u origin master
```

> 代码

```javascript
this.$router.push({ path: `/content/poster/${field}` });
this.$router.push({ name: "poster", params: { id: `${field}` } });
this.$router.push({ path: "poster", query: { id: `${field}` } });
// 这里就拿到了iframe的对象
//console.log(this.$refs.iframe);
// 这里就拿到了iframe的window对象
//console.log(this.$refs.iframe.contentWindow);
```

```html
    <el-col :span="16">
        <h3>海报模板编辑选择</h3>
        <el-row :gutter="10">
            <el-col :span="20" :offset="2">
                <swiper :options="swiperOption" ref="pSwiper">
                    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                        <img src="@/images/unlc913q91edsg.png" alt="">
                    </swiper-slide>
                </swiper>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <div class="element-box">
                <iframe ref="iframe" src="../static/poster1.html"></iframe>
            </div>
            <div class="page-manage"></div>
        </el-row>
    </el-col> 
                                <!-- <a href="javascript:;" 
                                        class="poster-a" 
                                        style="color:#409EFF" 
                                        v-if="query.contentTemplateId" @click="posterEditAction">请选择海报编辑</a>                               -->    
```

> 状态码解释

- 415
- 400 后台
- 404

* 发送设备指令还没有做完
* 省市区选择需要优化(建议做成一个下拉框，数据全部返回来)
* 某些编辑页面域名回选问题
* 对于没有做修改的情况下，避免提交到后台去
* 海报编辑页面逻辑
* 海报模板需要缩略图或者名称
* 海报模板宽高是 1080\*1590 默认等比缩放
* 海报模板根据内容填充key和value
