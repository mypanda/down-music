let jsonp = require('jsonp-client')
let fs = require('fs')

let url = 'http://music.zhuolin.wang/api.php',
    panda = "MYPANDA",
    pandaFace = "🐼"

/* 
  parmas: data 
  组合成想要的对象
*/
function combinate (data,lid) {

  // 组合之后 歌单 的信息
  var tempList = {
    id: lid,    // 列表的网易云 id
    name: data.playlist.name,   // 列表名字
    cover: data.playlist.coverImgUrl,   // 列表封面
    creatorName: data.playlist.creator.nickname,   // 列表创建者名字
    creatorAvatar: data.playlist.creator.avatarUrl,   // 列表创建者头像
    item: [] // 歌曲
  };

  // 
  if (data.playlist.coverImgUrl !== '') {
    tempList.cover = data.playlist.coverImgUrl;
  } else {
    tempList.cover = musicList[0].cover;
  }

  // 
  if (typeof data.playlist.tracks !== undefined || data.playlist.tracks.length !== 0) {
    // 存储歌单中 各个 音乐信息
    for (var i = 0; i < data.playlist.tracks.length; i++) {
      tempList.item[i] = {
        id: data.playlist.tracks[i].id,  // 音乐ID
        name: data.playlist.tracks[i].name,  // 音乐名字
        artist: data.playlist.tracks[i].ar[0].name, // 艺术家名字
        album: data.playlist.tracks[i].al.name,    // 专辑名字
        source: "netease",     // 音乐来源
        url_id: data.playlist.tracks[i].id,  // 链接ID
        pic_id: null,  // 封面ID
        lyric_id: data.playlist.tracks[i].id,  // 歌词ID
        pic: data.playlist.tracks[i].al.picUrl,    // 专辑图片
        url: null   // mp3链接
      };
    }
  }

  // 返回歌单
  return tempList
}

/* 
  parmas: lid 歌单的id
          cb 参数就是返回的数据 歌单的所有歌曲 数据格式是

          [
            { id: 29932452,fee: 0,payed: 0,st: 0,pl: 320000,dl: 320000,sp: 7,cp: 1,subp: 1,cs: false,maxbr: 128000,fl: 320000,toast: false,flag: 0}
          ]

  获取所有的 歌单 所有的歌曲 信息 不包含 下载地址
*/
function getSongsInfo(lid,cb) {
  jsonp(`${url}?types=playlist&id=${lid}&callback=cb`,function(err,data){

    // 报错返回
    if(err) return console.log('错误')
    
    // 接收 歌单 信息 以及 全部歌曲
    var lists = combinate(data,lid)

    // 全部歌曲
    var musics = lists.item

    // 返回歌单 所有的歌曲id 版本1
    Promise.all(musics.map(item => getDownloadUrl(item))).then(function(data){

      // data [{id:xxx,name:xxx,url:xxx}]
      // 重新组合
      let playList = {id:lists.id,name:lists.name,items:[]}
      playList.items = data

      writeJson(playList)
    })
  })
}

/* 
  参数1 数组 [{id:xxx,name:xxx,url:xxx}]
  参数2 保存的文件名字
  把获取的 歌曲名字 id url 保存到本地
*/

function writeJson(obj,fileName="songsInfo"){
    let jsonString = JSON.stringify(obj),
        playListLength = obj.items.length

    // fileName = './' + validatFolderName(obj.name) + '.json'
    fileName = './dist/' + fileName + '.json'

    fs.writeFile(fileName,jsonString,function(err){
      if (err) new Error(`${panda}${err}`)
      console.log(`----------------------------------------------------------\r\n| 写入成功, 歌曲数目 -> ${showColorFont(playListLength)} \r\n| 文件位置 -> ${showColorFont(fileName)}  \r\n| 删除json -> ${showColorFont('npm run clean')} \r\n| - ${showColorFont(panda)} - \r\n----------------------------------------------------------`)
    })
}
/* 
  返回歌曲 真实 url
*/
function getDownloadUrl(music) {
  return new Promise(function(resolve,reject){
    jsonp(`${url}?types=url&id=${music.id}&source=${music.source}&callback=cb`,function(err,data){
      if(err) reject(new Error(err))
      let song = {id:music.id,name:panda + ' - ' +music.name,url:data.url}
      console.log(`${song.name} - ${showColorFont(song.url)}`)
      resolve(song)
    })
  })
}

/* 
  输出 颜色 字体
*/
function showColorFont(msg) {
  return `\x1B[36m${msg}\x1B[0m`
}


/* 
  新建文件夹
*/
// function createFolder(folderName = "download"){
//   folderName = validatFolderName(folderName)
//   let i = 0

//   !(function loop(){
//     if(fs.existsSync(`${folderName}${i}`)){
//       loop(folderName + (i++))
//     }else{
//       return fs.mkdirSync(`${folderName}${i}`)
//     }
//   })()
// }

// version
function createFolder(folderName = "download"){
  return new Promise(function(resolve,reject){
    folderName = validatFolderName(folderName)
    let i = 0
    folderName = './dist/' + folderName

    !(function loop(){
      if(fs.existsSync(`${folderName}${i}`)){
        loop(folderName + (i++))
      }else{
        fs.mkdir(`${folderName}${i}`,'0777',function(err){
          if(err) reject(err)
          resolve(`${folderName}${i}`)
        })
      }
    })()
  })
}

/* 
  重置文件夹 特殊符号
*/
function validatFolderName(folderName=''){
  let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？_]")
  let newFolderName = ''
  for (var i = 0, l = folderName.length; i < folderName.length; i++) { 
      newFolderName = newFolderName + folderName.substr(i, 1).replace(reg, ''); 
  } 
  return newFolderName;
}

/* 
  获取json文件
*/
function jsonToObj(jsonFileName){
  return getFile(jsonFileName).then(function(data){
    return new Promise(function(resolve,reject){
      if(!data) reject("JSON文件转对象错误 为空")
      let obj = JSON.parse(data)
      resolve(obj)
    })
  })
}

/* 
  参数1 fileName 路径
  读取文件
*/
function getFile(fileName) {
  return new Promise(function(resolve,reject){
   fs.readFile(fileName, 'utf8',function(err,data){
     if(err) return new Error(`读取文件错误 - ${err}`)
     resolve(data)
   })
  })
}
module.exports = {
  getDownloadUrl,
  getSongsInfo,
  createFolder,
  validatFolderName,
  jsonToObj
}