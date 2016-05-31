bPlayer
========

[Demo演示](https://classicoldsong.github.io/bPlayer)

bPlayer - 原生音频播放器的绝佳替代品

无需jQuery且保留了大量原生audio元素的api，同时增加了歌曲名称、艺术家和专辑封面的显示

旨在取代各浏览器的原生播放器以带来更丰富的操作以及更统一的体验

---

***非常重要！！***
------------
bPlayer 自 v0.2.0-alpha.1 起，行为与 v0.1.0 时不同！！由原先的append到绑定的元素的末尾改为了***直接替换被绑定的元素***！替换后原先元素的所有attribute全部保留，可以与替换之前一样操作！

更新请务必注意！！！

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
		var bplayer1 = new bPlayer();
		bplayer.attach("#bp1").color("/*进度条颜色*/").src("/*歌曲链接*/").title("/*歌曲名称*/").artist("/*艺术家*/").cover("/*专辑封面链接*/").init();
		var bp2 = document.querySelector('#bp2')
		var bplayer2 = new bPlayer({
			element: bp2,
			cover: "/*专辑封面链接*/",
			title: "/*歌曲名称*/",
			artist: "/*艺术家*/",
			autoplay: "/*自动播放*/",
			slim: true, /*Bool, 是否苗条模式*/
		});
	}
</script>
...

<div id="bp1"></div>
<div id="bp2"></div>
<audio src="/*歌曲链接*/" cover="/*专辑封面链接*/" title="/*歌曲名称*/" artist="/*艺术家*/" color="/*进度条颜色*/" slim="/*是否启用苗条模式*/" aotoplay="/*是否自动播放*/" loop="/*是否循环播放*/" controls></audio>
~~~

页面加载完毕后你看到的是：

~~~ javascript
<bplayer id="bp1">...</bplayer>
<bplayer id="bp2">...</bplayer>
<bplayer src="/*歌曲链接*/" cover="/*专辑封面链接*/" title="/*歌曲名称*/" artist="/*艺术家*/" color="/*进度条颜色*/" slim="/*是否启用苗条模式*/" aotoplay="/*是否自动播放*/" loop="/*是否循环播放*/" controls>...</bplayer>
~~~

**注意1：** *引入bPlayer后，会自动在DOM结构加载完成以后扫描页面内的所有audio节点，并将含有controls属性的audio节点转换为bplayer节点。原audio节点的所有attribute保留。*

**注意2：** *手动绑定audio标签时将使用原audio标签作为音频来源，但是仍然需要手动添加除`src`以外的属性*

### API

##### 链式操作法

~~~ javascript
var bplayer = new bPlayer();
~~~
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
+ `bplayer.init() // 使绑定的元素成为bPlayer`
+ `bplayer.playing() // 获取播放状态`

##### JSON传入法
~~~ javascript
var bplayer = new bPlayer({
	element: "#bplayer" // CSS选择器或者Node对象
	src: "aaa.mp3", // String, 歌曲链接地址
	title: "Title", // String, 歌曲标题
	artist: "artist", // String, 歌曲艺术家
	color: "color", // String, 颜色代码
	volume: 1, // Number, [0~1], 音量大小
	muted: false, // Bool, 是否静音
	autoplay: false, // Bool, 是否自动播放
	loop: false, // Bool, 是否开启循环
	slim: false // Bool, 是否开启苗条模式
});
~~~

*使用JSON传入法时无需使用bplayer.init()进行初始化，创建bplayer时将自动处理完毕。选项允许缺省，但是`element`字段必须存在*

##### BPLAYER标签
对于已经被attach的元素，可以直接在元素上操作，操作方式与原生audio大同小异，比如`element.src = 'aaa.mp3'`，目前支持的有：
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
