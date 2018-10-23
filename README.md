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
