### 看这里 看这里
```
* 在根目录添加dist文件夹
* app里面一定要写歌单id,和名字
```
### 一键下载网易云歌单全部音乐

### 请关注这位大佬的WEB [大佬](http://music.zhuolin.wang) 接口从这位大佬调用的 可以请他喝杯coffe

### 必备node npm

### 配置
```
在*src/app.js*的*xx*处，写入网易云歌单id
`utils.getSongsInfo(xx, function (nameUrl) {})`
```

### 运行
```
npm start

或者分步骤
npm run step1 下载地址 和 名字 的对应
npm run step2 最终的下载

```

### 清理工作
* `npm run clean`


### 我要先获得喜悦

* 按照以下步骤即可，然后查看 songs 文件夹，来获得喜悦的心情
* 默认是[^_^ 熊猫猫的歌单有逼格 三剑客一 song](http://music.163.com/#/my/m/music/playlist?id=120018407)歌单的下载

* `npm install`
* `npm run clean`
* `echo finish`

### 注意事项
* dist文件夹不要删除额
