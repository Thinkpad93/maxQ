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
const ws = new WebSocket("ws://localhost:8080");
```

> 后端返回状态码

- 415
- 400 请求参数错误
- 404 请求地址错误

* 发送设备指令还没有做完
* 运行日志页面需要完善
* 省市区选择需要优化(建议做成一个下拉框，数据全部返回来)
* 某些编辑页面域名回选问题
* 对于没有做修改的情况下，避免提交到后台去
* 海报编辑页面逻辑
* 海报模板需要缩略图或者名称
* 海报模板宽高是 1080\*1590 默认等比缩放
* 海报模板根据内容填充 key 和 value
