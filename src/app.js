let shell = require('shelljs')
let utils = require('./utils')
let fs = require('fs')

// 歌单
var playLists = [
  { id: '2039081586', name: '2017年度热议单曲TOP100' },
  { id: '3778678', name: '云音乐热歌榜' },
  { id: '3779629', name: '云音乐新歌榜' },
  { id: '4395559', name: '华语金曲榜' },
  { id: '64016', name: '中国TOP排行榜' },
  { id: '112504', name: '中国TOP排行榜' },
  { id: '19723756', name: '云音乐飙升榜' },
  { id: '2884035', name: '网易原创歌曲榜' },
  { id: '2884035', name: '网易原创歌曲榜' },
  { id: '368214813', name: 'KTV男生必备300首' },
  { id: '395280061', name: '好听的80年代90年代经典老歌' },
  { id: '409933862', name: '最全周杰伦歌单！一代人的记忆' },
  { id: '120018407', name: '^_^ 熊猫猫的歌单有逼格 三剑客' },
  { id: '440103454', name: '|经典怀旧|老留声机里的深情往事' },
  { id: '637424692', name: '年轻时不多经历一点 老了拿什么下酒' },
  { id: '2035485974', name: '祝贺最后一批90后集体告别少年时代' },
  { id: '129627424', name: '如果你想听民谣，可以从这些歌曲开始。' },
  { id: '2009145567', name: '梦回旧景 | 多想回到最初遇见你的时光' },
  { id: '2029428985', name: '华语百首 | 歌词里那些欲言又止的少女心事' },
]

// 下载
utils.getSongsInfo(playLists[12].id)