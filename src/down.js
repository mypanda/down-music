var fs = require('fs')
var shell = require('shelljs')
var utils = require('./utils')


// 读取JSON 转对象
utils.jsonToObj('./dist/songsInfo.json').then(function(data){

  // 错误处理
  if(!data) return new Error('读取的歌单对象是错误的')
  
  // 判断是否有文件夹
  utils.createFolder(data.name).then(function(folderName){
    // 新建文件夹 成功
    if(folderName){
      // data是playList的信息
      // {id:xx,name:xx,items:[]}
      data.items.forEach(function(item) {
        downLoadSong(folderName,item)
      }, this);
    }
  })
  
})

function downLoadSong(playListName,obj) {
  return new Promise(function (resolve, reject) {
    shell.exec(`curl -L  "${obj.url}" >> "${playListName}/${obj.name}.mp3"`)
  })
}
