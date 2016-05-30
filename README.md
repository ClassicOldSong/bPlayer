bPlayer
========

[Demo演示](https://classicoldsong.github.io/bPlayer)

bPlayer - 比原生播放器好一点点的播放器

无需jQuery且保留了大量原生audio元素的api，同时增加了歌曲名称、艺术家和专辑封面的显示

---

安装
------------

	git clone https://github.com/classicoldsong/bPlayer.git

###配置及使用

引入bplayer.js，丢个带controls的audio标签在页面里，然后就搞定了~或者手动绑定元素也可以的说

下面是一个简单的示例：

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
<audio src="/*歌曲链接*/" cover="/*专辑封面链接*/" title="/*歌曲名称*/" artist="/*艺术家*/" color="/*进度条颜色*/" slim="/*是否启用苗条模式*/" aotuplay="/*是否自动播放*/" loop="/*是否循环播放*/" controls></audio>
~~~

*注意：引入bPlayer后，会自动在DOM结构加载完成以后扫描页面内的所有audio节点，并将含有controls属性的audio节点转换为bplayer节点。原audio节点的id,class以及style保留。*

###API
+ `bplayer.attach([Node]) // 绑定元素，必须第一个执行`
+ `bplayer.slim([bool]) // 设定是否开启苗条模式`
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
+ `bplayer.playing() // 获取播放状态`

对于已经被attach的元素，可以直接在元素上操作，操作方式与原生大同小异，比如`element.src = 'aaa,mp3'`，目前支持的有：
+ `element.slim`
+ `element.src`
+ `element.cover`
+ `element.title`
+ `element.artist`
+ `element.color`
+ `element.volume`
+ `element.muted`
+ `element.autoplay`
+ `element.loop`
+ `element.playing`

## TBD

- [ ] ~~歌词~~（已放弃，下个播放器见）
- [ ] ~~播放列表~~（已放弃，下个播放器见）
- [ ] 原生事件API

许可证：MIT
-------

如有疑问或者建议欢迎提Issue或者PullRequest或者联系我的邮箱 syqlds@126.com

当然也欢迎访问我的博客 [C次元](http://classicoldsong.me)

**DEMO中使用的音乐版权归原作者所有**
