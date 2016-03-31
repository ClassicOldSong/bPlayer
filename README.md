bPlayer
========

[Demo演示](https://classicoldsong.github.io/bPlayer)

bPlayer - 比原生播放器好一点点的播放器

无需jQuery且保留了大量原生audio元素的api，同时增加了歌曲名称、艺术家和专辑封面的显示

---

安装
------------

	git clone https://github.com/classicoldsong/bPlayer.git

###配置

~~~ javascript
<link rel="stylesheet" href="bplayer.css">
<script src="bplayer.js"></script>
<script>
	window.onload = function(){
		var bplayer = new bPlayer();
		bplayer.attach("#bp1").color("/*进度条颜色*/").src("/*歌曲链接*/").title("/*歌曲名称*/").artist("/*艺术家*/").cover("/*专辑封面链接*/").init();
	}
</script>
...

<div id="bp1"></div>
~~~

###API
+ `bplayer.attach([元素]) // 绑定元素，必须第一个执行`
+ `bplayer.src([url]) // 设定歌曲链接，留空返回当前值`
+ `bplayer.cover([url]) // 设定封面链接，留空返回当前值`
+ `bplayer.title([string]) // 设定标题，留空返回当前值`
+ `bplayer.artist([string]) // 设定艺术家，留空返回当前值`
+ `bplayer.color([color]) // 设定进度条颜色，留空返回当前值`
+ `bplayer.volume([number 0 ~ 1]) // 设定音量，留空返回当前值`
+ `bplayer.muted([bool]) // 设定静音，留空返回当前值`
+ `bplayer.autoplay([bool]) // 设定自动播放，留空返回当前值，若希望创建后立即播放请在src前设置此项`
+ `bplayer.loop([bool]) // 设定循环动播放，留空返回当前值`
+ `bplayer.play() // 播放`
+ `bplayer.pause() // 暂停`
+ `bplayer.init() // 将bPlayer置于绑定的元素末尾`

## TBD

- [ ] 歌词
- [ ] 播放列表
- [ ] 原生事件API

许可证：MIT
-------

如有疑问或者建议欢迎提Issue或者PullRequest或者联系我的邮箱 syqlds@126.com

当然也欢迎访问我的博客 [C次元](http://classicoldsong.me)