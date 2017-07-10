(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.bPlayer = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
var content = "<div class=\"info_bplayer\">\n\t<div class=\"titlewrap_bplayer\">\n\t\t<span class=\"title_bplayer\">Unknown Title</span>\n\t\t<span class=\"author_bplayer\">Unknown Artist</span>\n\t</div>\n\t<div class=\"time_bplayer\">\n\t\t<span class=\"current_bplayer\">00:00</span>\n\t\t<span class=\"total_bplayer\">00:00</span>\n\t</div>\n\t<div class=\"buttons_bplayer\">\n\t\t<div class=\"disabled_bplayer btn_bplayer\" id=\"loopBtn_bplayer\">\n\t\t\t<i class=\"iconfont_bplayer\">&#xe600;</i>\n\t\t</div>\n\t\t<div class=\"volume_bplayer\">\n\t\t\t<div class=\"volumebtn_bplayer btn_bplayer\" id=\"volumeBtn_bplayer\">\n\t\t\t\t<i class=\"iconfont_bplayer\">&#xe602;</i>\n\t\t\t</div>\n\t\t\t<div class=\"volumebar_bplayer\">\n\t\t\t\t<div class=\"volumebg_bplayer\"></div>\n\t\t\t\t<div class=\"volumeval_bplayer\"></div>\n\t\t\t\t<div class=\"volumectl_bplayer\"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<div class=\"cover_bplayer\">\n\t<div class=\"coverimg_bplayer\"></div>\n\t<div class=\"controlbtn_bplayer playBtn_bplayer\" id=\"playBtn_bplayer\">\n\t\t<i class=\"iconfont_bplayer\">&#xe601;</i>\n\t</div>\n\t<div class=\"controlbtn_bplayer hidden_bplayer\" id=\"pauseBtn_bplayer\">\n\t\t<i class=\"iconfont_bplayer\">&#xe603;</i>\n\t</div>\n</div>\n<div class=\"progress_bplayer\">\n\t<div class=\"loaded_bplayer\"></div>\n\t<div class=\"played_bplayer\"></div>\n\t<div class=\"progressctl_bplayer\"></div>\n</div>\n";

var appName = '[BP]';
var info = console.info.bind(console, appName);
var warn = console.warn.bind(console, appName);

__$styleInject("@font-face {\n\tfont-family: 'iconfont_bplayer';  /* project id 67267 */\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot');\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot?#iefix') format('embedded-opentype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.woff') format('woff'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.ttf') format('truetype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.svg#iconfont') format('svg');\n}\n\nbplayer {\n\tdisplay: block;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.iconfont_bplayer {\n\tfont-family:\"iconfont_bplayer\";\n\tfont-style:normal;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-stroke-width: 0.2px;\n}\n\n.bPlayer {\n\tbox-sizing: border-box;\n\tposition: relative;\n\tfont-family:\n\t\tHelvetica, Tahoma, Arial, \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", STXihei, STHeiti, Heiti, SimSun, sans-serif;\n\twidth: 100%;\n\theight: 60px;\n\tbackground-color: #FFF;\n\tcursor: default;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\tcolor: #000;\n\ttext-shadow: rgba(0, 0, 0, 0.15) 0px 0px 2px;\n}\n\n.cover_bplayer {\n\tbackground-color: #CCC;\n\theight: 60px;\n\twidth: 60px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n.cover_bplayer:before {\n\tcontent: \"\\e605\";\n\tfont-family:\"iconfont_bplayer\";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n}\n\n.coverimg_bplayer {\n\tposition: absolute;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.controlbtn_bplayer {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n\tbackground-color: rgba(0,0,0,0.27);\n\topacity: 0;\n\tdisplay: block;\n\ttransition: opacity 500ms;\n\ttext-shadow: #FFF 0px 0px 2px;\n}\n.controlbtn_bplayer.playBtn_bplayer {\n\topacity: 0.8;\n}\n.controlbtn_bplayer:hover {\n\topacity: 1;\n}\n\n.info_bplayer {\n\toverflow: hidden;\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\theight: 60px;\n\twidth: 100%;\n}\n\n.titlewrap_bplayer {\n\tpadding-left: 72px;\n\tpadding-right: 140px;\n\tline-height: 60px;\n\theight: 60px;\n\tfont-size: 20px;\n\twhite-space: nowrap;\n\ttext-align: left;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\n\n.author_bplayer {\n\tfont-size: 80%;\n\topacity: 0.8;\n}\n.author_bplayer:before {\n\tcontent: \" - \";\n}\n\n.buttons_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tfont-size: 16px;\n\tright: 0;\n}\n.btn_bplayer {\n\theight: 20px;\n\twidth: 20px;\n\tline-height: 20px;\n\ttext-align: center;\n\tmargin-right: 8px;\n\tfloat: right;\n\topacity: 1;\n\ttransition: opacity 500ms;\n}\n\n.progress_bplayer {\n\tposition: absolute;\n\tbottom: 0;\n\theight: 2px;\n\twidth: 100%;\n\ttransition: height 500ms;\n}\n.progress_bplayer:hover {\n\theight: 6px;\n}\n.loaded_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #AAA;\n\ttransition: width 300ms linear;\n}\n.played_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #A91212;\n\tbox-shadow: #A91212 0px 0px 3px;\n\ttransition: width 100ms linear;\n}\n.progressctl_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.time_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tright: 65px;\n\tline-height: 20px;\n\tfont-size: 12px;\n}\n.total_bplayer:before {\n\tcontent: \" / \";\n}\n\n.volume_bplayer {\n\tposition: relative;\n\tline-height: 20px;\n\theight: 20px;\n\twidth: 20px;\n\tfloat: right;\n\tmargin-right: 8px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\tbackground-color: #FFF;\n\ttransition: box-shadow 500ms, width 500ms;\n}\n.volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\twidth: 109px;\n}\n.volumebtn_bplayer {\n\tfloat: right;\n\tmargin: 0;\n}\n.volumebar_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 20px;\n\theight: 20px;\n\twidth: 88px;\n}\n.volumebg_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #AAA;\n}\n.volumeval_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #A91212;\n\tbox-shadow: #A91212 0px 0px 3px;\n}\n.volumectl_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin-left: 6px;\n\tpadding-right: 3px;\n\theight: 20px;\n}\n\n\n.disabled_bplayer {\n\topacity: 0.2;\n}\n\n.hidden_bplayer {\n\topacity: 0;\n\tdisplay: none;\n}\n\n.narrow_bplayer .buttons_bplayer {\n\ttop: 35px;\n}\n.narrow_bplayer .time_bplayer {\n\ttop: 35px;\n}\n\n.narrow_bplayer .titlewrap_bplayer {\n\tpadding-right: 0;\n\tline-height: 40px;\n\tfont-size: 16px;\n}\n\n\n/* Section for bPayer_slim */\n.bPlayer.slim_bPlayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .cover_bplayer {\n\theight: 30px;\n\twidth: 30px;\n}\n.slim_bPlayer .cover_bplayer:before {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .controlbtn_bplayer {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .info_bplayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .titlewrap_bplayer {\n\tpadding-left: 38px;\n\tpadding-right: 140px;\n\tline-height: 30px;\n\theight: 30px;\n\tfont-size: 16px;\n}\n\n.slim_bPlayer .buttons_bplayer {\n\ttop: 0;\n\theight: 30px;\n}\n.slim_bPlayer .btn_bplayer {\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .time_bplayer {\n\ttop: 0;\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .volume_bplayer {\n\theight: 30px;\n\ttransition: width 500ms;\n}\n.slim_bPlayer .volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\twidth: 109px;\n}\n.slim_bPlayer .volumebar_bplayer {\n\theight: 30px;\n}\n.slim_bPlayer .volumebg_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumeval_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumectl_bplayer {\n\theight: 30px;\n}\n\n",undefined);

/* global "1.0.3.dev.ce400ad" */
// Import everything
var defaults = {
	src: '',
	cover: '',
	title: 'Unknown',
	artist: 'Unknown',
	color: '#A91212',
	volume: 1,
	muted: false,
	autoplay: false,
	loop: false,
	slim: false
};

var response = function() {
	if (this.clientWidth <= 460) {
		this.classList.add("narrow_bplayer");
	} else {
		this.classList.remove("narrow_bplayer");
	}
};

var formatTime = function (sec) {
	var hours = Math.floor(sec / 3600);
	var minutes = Math.floor((sec - (hours * 3600)) / 60);
	var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

	var hs = '';
	var ms = '';
	var ss = '';

	hs = hours + ":";
	if (isNaN(minutes)) { ms = '00:'; }
	else { ms = "" + minutes; }
	if (isNaN(seconds)) { ss = '00'; }
	else { ss = "" + seconds; }
	if (hours < 10) { hs = "0" + hours + ":"; }
	if (minutes < 10) { ms = "0" + minutes + ":"; }
	if (seconds < 10) { ss = "0" + seconds; }
	if (isNaN(hours) || hours <= 0) { hs = ''; }
	return ("" + hs + ms + ss)
};

var bPlayer = (function () {
	function bPlayer(el, data) {
	var this$1 = this;

		// Ensure element
		if (!(el instanceof Element)) { el = document.querySelector(el); }

		// Check if the element has been turned into bPlayer
		if (el.bp instanceof bPlayer) { return warn('This element has already been attached!') }
		Object.defineProperty(el, 'bp' , { value: this });

		var parent = el.parentNode;

		Object.defineProperty(this, '_el', { value: document.createElement('bplayer') });

		var _response = response.bind(this._el);

		for (var i = 0; i < el.attributes.length; i++) {
			if (!(/(src|title|artist|slim|cover|color|autoplay|loop|controls)/i.test(el.attributes[i].name))) { this$1._el.setAttribute(el.attributes[i].name, el.attributes[i].value); }
		}
		this._el.classList.add('bPlayer');
		this._el.insertAdjacentHTML('afterbegin', content);

		var status = {
			progressdown: false,
			volumedown: false
		};

		// Get all needed elements
		var els = {
			cover: this._el.querySelector('.coverimg_bplayer'),
			progressCtl: this._el.querySelector('.progressctl_bplayer'),
			volumeCtl: this._el.querySelector('.volumectl_bplayer'),
			title: this._el.querySelector('.title_bplayer'),
			artist: this._el.querySelector('.author_bplayer'),
			played: this._el.querySelector('.played_bplayer'),
			current: this._el.querySelector('.current_bplayer'),
			loaded: this._el.querySelector('.loaded_bplayer'),
			total: this._el.querySelector('.total_bplayer'),
			volumeVal: this._el.querySelector('.volumeval_bplayer'),
			playCtl: this._el.querySelector('.cover_bplayer'),
			volumeBtn: this._el.querySelector('#volumeBtn_bplayer'),
			loopBtn: this._el.querySelector('#loopBtn_bplayer'),
			playBtn: this._el.querySelector('#playBtn_bplayer'),
			pauseBtn: this._el.querySelector('#pauseBtn_bplayer')
		};

		// Check if the element is an audio tag
		if (el.tagName.toUpperCase() === 'AUDIO') {
			els.audio = el;
			el = document.createTextNode('');
			parent.insertBefore(el, els.audio);
		} else { els.audio = new Audio(); }

		// Hide the audio element
		els.audio.controls = false;

		// Attach to DOM
		this._el.appendChild(els.audio);
		parent.replaceChild(this._el, el);
		window.addEventListener('resize', _response);
		_response();

		var progressCtl = els.progressCtl;
	var volumeCtl = els.volumeCtl;
	var played = els.played;
	var current = els.current;
	var loaded = els.loaded;
	var total = els.total;
	var volumeVal = els.volumeVal;
	var volumeBtn = els.volumeBtn;
	var playCtl = els.playCtl;
	var loopBtn = els.loopBtn;
	var playBtn = els.playBtn;
	var pauseBtn = els.pauseBtn;

		progressCtl.addEventListener('click', function(e) {
			var w = this.clientWidth;
			var x = e.offsetX;
			if (x >= 0 && x <= w) { els.audio.currentTime = x / w * els.audio.duration; }
		});
		progressCtl.addEventListener('mousedown', function () {
			status.progressdown = true;
		});
		progressCtl.addEventListener('mouseup', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('mouseout', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('mousemove', function(e) {
			if (status.progressdown) {
				var w = this.clientWidth;
				var x = e.offsetX;
				if (x >= 0 && x <= w) { els.audio.currentTime = x / w * els.audio.duration; }
			}
		});
		progressCtl.addEventListener('touchstart', function () {
			status.progressdown = true;
		});
		progressCtl.addEventListener('touchend', function () {
			status.progressdown = false;
		});
		progressCtl.addEventListener('touchmove', function(e) {
			if (status.progressdown) {
				var w = this.clientWidth;
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left;
				if (x >= 0 && x <= w) { els.audio.currentTime = x / w * els.audio.duration; }
			}
		});
		volumeCtl.addEventListener('click', function (e) {
			var x = e.offsetX;
			if (x >= 0 && x <= 80) { els.audio.volume = x / 80; }
		});
		volumeCtl.addEventListener('mousedown', function () {
			status.volumedown = true;
		});
		volumeCtl.addEventListener('mouseup', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('mouseout', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('mousemove', function (e) {
			if (status.volumedown) {
				var x = e.offsetX;
				if (x >= 0 && x <= 80) { els.audio.volume = x / 80; }
			}
		});
		volumeCtl.addEventListener('touchstart', function () {
			status.volumedown = true;
		});
		volumeCtl.addEventListener('touchend', function () {
			status.volumedown = false;
		});
		volumeCtl.addEventListener('touchmove', function (e) {
			if (status.volumedown) {
				var x = e.touches[0].pageX - e.target.getBoundingClientRect().left;
				if (x >= 0 && x <= 80) { els.audio.volume = x / 80; }
			}
		});
		volumeBtn.addEventListener('click', function () {
			this$1._el.muted = !this$1._el.muted;
		});
		playCtl.addEventListener('click', function () {
			if (els.audio.paused) {
				this$1._el.play();
			} else {
				this$1._el.pause();
			}
		});
		loopBtn.addEventListener('click', function () {
			this$1._el.loop = !this$1._el.loop;
		});

		els.audio.addEventListener('timeupdate', function() {
			played.style.width = (this.currentTime / this.duration * 100) + "%";
			current.textContent = formatTime(this.currentTime);
		});
		els.audio.addEventListener('progress', function() {
			if (this.buffered.length === 1) { loaded.style.width = (this.buffered.end(0) / this.duration * 100) + "%"; }
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('volumechange', function() {
			volumeVal.style.width = (this.volume * 80) + "px";
		});
		els.audio.addEventListener('play', function() {
			playBtn.classList.add('hidden_bplayer');
			pauseBtn.classList.remove('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('pause', function() {
			playBtn.classList.remove('hidden_bplayer');
			pauseBtn.classList.add('hidden_bplayer');
			total.textContent = formatTime(this.duration);
		});
		els.audio.addEventListener('ended', function () {
			if (!this$1.loop) {
				this$1.pause();
			}
		});

		Object.defineProperties(this._el, {
			data: {
				get: function get() {
					return {
						src: this.src,
						cover: this.cover,
						title: this.title,
						artist: this.artist,
						color: this.color,
						slim: this.slim,
						volume: this.volume,
						muted: this.muted
					}
				},
				set: function set(data) {
				var this$1 = this;

					for (var i in defaults) {
						if (data[i] !== null && typeof data[i] !== 'undefined') {
							this$1[i] = data[i];
						}
					}
				}
			},
			slim: {
				get: function get() {
					return this.className.split(' ').indexOf('slim_bPlayer') !== -1
				},
				set: function set(slim) {
					slim = !!slim;
					if (slim) { this.classList.add('slim_bPlayer'); }
					else { this.classList.remove('slim_bPlayer'); }
				}
			},
			src: {
				get: function get() {
					return els.audio.src
				},
				set: function set(src) {
					els.audio.src = src;
				}
			},
			cover: {
				get: function get() {
					return els.cover.style.backgroundImage.split('")')[0].split('url("')[1]
				},
				set: function set(cover) {
					els.cover.style.backgroundImage = "url(\"" + cover + "\")";
				}
			},
			title: {
				get: function get() {
					return els.title.textContent
				},
				set: function set(title) {
					els.title.textContent = title;
				}
			},
			artist: {
				get: function get() {
					return els.artist.textContent
				},
				set: function set(artist) {
					els.artist.textContent = artist;
				}
			},
			color: {
				get: function get() {
					return els.played.style.backgroundColor
				},
				set: function set(color) {
					var shadow = color + " 0px 0px 3px";
					els.played.style.backgroundColor = color;
					els.played.style.boxShadow = shadow;
					els.volumeVal.style.backgroundColor = color;
					els.volumeVal.style.boxShadow = shadow;
				}
			},
			volume: {
				get: function get() {
					return els.audio.volume
				},
				set: function set(volume) {
					els.audio.volume = volume;
				}
			},
			muted: {
				get: function get() {
					return els.audio.muted
				},
				set: function set(muted) {
					muted = !!muted;
					els.audio.muted = muted;
					if (muted) { els.volumeBtn.classList.add('disabled_bplayer'); }
					else { els.volumeBtn.classList.remove('disabled_bplayer'); }
				}
			},
			loop: {
				get: function get() {
					return els.audio.loop
				},
				set: function set(loop) {
					loop = !!loop;
					els.audio.loop = loop;
					if (loop) { els.loopBtn.classList.remove('disabled_bplayer'); }
					else { els.loopBtn.classList.add('disabled_bplayer'); }
				}
			},
			autoplay: {
				get: function get() {
					return els.audio.autoplay
				},
				set: function set(autoplay) {
					autoplay = !!autoplay;
					els.audio.autoplay = autoplay;
				}
			},
			paused: {
				get: function get() {
					return els.audio.paused
				}
			},
			addListener: {
				value: function (type, fn) { return els.audio.addEventListener(type, fn, false); }
			},
			removeListener: {
				value: function (type, fn) { return els.audio.removeEventListener(type, fn, false); }
			},
			play: {
				value: els.audio.play.bind(els.audio)
			},
			pause: {
				value: els.audio.pause.bind(els.audio)
			},
			bp: {
				value: this
			}
		});

		if (data) {
			for (var i$1 in defaults) {
				if (data[i$1] === null || typeof data[i$1] === 'undefined') { data[i$1] = defaults[i$1]; }
			}
		} else { data = Object.assign({}, defaults); }
		for (var i$2 in defaults) { this$1[i$2](data[i$2]); }
	}

	var prototypeAccessors = { paused: {},bp: {} };
	var staticAccessors = { version: {} };

	bPlayer.prototype.data = function data (data$1) {
		if (typeof data$1 !== 'undefined') {
			this._el.data = data$1;
			return this
		}
		return this._el.data
	};

	bPlayer.prototype.slim = function slim (slim$1) {
		if (typeof slim$1 !== 'undefined') {
			this._el.slim = slim$1;
			return this
		}
		return this._el.slim
	};

	bPlayer.prototype.src = function src (src$1) {
		if (typeof src$1 !== 'undefined') {
			this._el.src = src$1;
			return this
		}
		return this._el.src
	};

	bPlayer.prototype.cover = function cover (cover$1) {
		if (typeof cover$1 !== 'undefined') {
			this._el.cover = cover$1;
			return this
		}
		return this._el.cover
	};

	bPlayer.prototype.title = function title (title$1) {
		if (typeof title$1 !== 'undefined') {
			this._el.title = title$1;
			return this
		}
		return this._el.title
	};

	bPlayer.prototype.artist = function artist (artist$1) {
		if (typeof artist$1 !== 'undefined') {
			this._el.artist = artist$1;
			return this
		}
		return this._el.artist
	};

	bPlayer.prototype.color = function color (color$1) {
		if (typeof color$1 !== 'undefined') {
			this._el.color = color$1;
			return this
		}
		return this._el.color
	};

	bPlayer.prototype.volume = function volume (volume$1) {
		if (typeof volume$1 !== 'undefined') {
			this._el.volume = volume$1;
			return this
		}
		return this._el.volume
	};

	bPlayer.prototype.muted = function muted (muted$1) {
		if (typeof muted$1 !== 'undefined') {
			this._el.muted = muted$1;
			return this
		}
		return this._el.muted
	};

	bPlayer.prototype.loop = function loop (loop$1) {
		if (typeof loop$1 !== 'undefined') {
			this._el.loop = loop$1;
			return this
		}
		return this._el.loop
	};

	bPlayer.prototype.autoplay = function autoplay (autoplay$1) {
		if (typeof autoplay$1 !== 'undefined') {
			this._el.autoplay = autoplay$1;
			return this
		}
		return this._el.autoplay
	};

	prototypeAccessors.paused.get = function () {
		return this._el.paused
	};

	bPlayer.prototype.addListener = function addListener () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		(ref = this._el).addListener.apply(ref, args);
		return this
		var ref;
	};

	bPlayer.prototype.removeListener = function removeListener () {
		var args = [], len = arguments.length;
		while ( len-- ) args[ len ] = arguments[ len ];

		(ref = this._el).removeListener.apply(ref, args);
		return this
		var ref;
	};

	bPlayer.prototype.play = function play () {
		this._el.play();
		return this
	};

	bPlayer.prototype.pause = function pause () {
		this._el.pause();
		return this
	};

	prototypeAccessors.bp.get = function () {
		return this
	};

	// Automatically convert audio tags with "controls"
	// attritube that have value of "bplayer" into bPlayer.
	bPlayer.scan = function scan () {

		/* eslint {no-new: "off"} */
		var audioList = document.querySelectorAll('audio[controls="bplayer"]');
		for (var i = 0; i < audioList.length; i++) {
			var data = {
				src: audioList[i].src,
				loop: audioList[i].loop,
				title: audioList[i].title,
				autoplay: audioList[i].autoplay,
				slim: JSON.parse(audioList[i].getAttribute('slim')),
				cover: audioList[i].getAttribute('cover'),
				color: audioList[i].getAttribute('color'),
				artist: audioList[i].getAttribute('artist')
			};
			new bPlayer(audioList[i], data);
		}
	};

	staticAccessors.version.get = function () {
		return "1.0.3.dev.ce400ad"
	};

	Object.defineProperties( bPlayer.prototype, prototypeAccessors );
	Object.defineProperties( bPlayer, staticAccessors );

	return bPlayer;
}());

// Set style for info
var ls1 = "\nbackground-color: #A91212;\nfont-weight: bold;\ncolor: #FFF;\nfont-size: 20px;\n";
var ls2 = "\nbackground-color: #531212;\nfont-weight: bold;\ncolor: #FEDCBA;\nfont-size: 20px;\n";
var ls3 = "\nbackground-color: #000;\nfont-weight: bold;\ncolor: #FEDCBA;\nfont-size: 12px;\n";
// Show information when bPlayer loaded successfully.
console.log(("%c bPlayer %c v" + "1.0.3.dev.ce400ad" + " \n%c See http://bplayer.js.org for detail. "), ls1, ls2, ls3);

return bPlayer;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWJ1Zy5qcyIsIi4uL3NyYy9icGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhcHBOYW1lID0gJ1tCUF0nXG5jb25zdCBpbmZvID0gY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSwgYXBwTmFtZSlcbmNvbnN0IHdhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlLCBhcHBOYW1lKVxuXG5leHBvcnQgeyBpbmZvLCB3YXJuIH1cbiIsIi8qIGdsb2JhbCBWRVJTSU9OICovXG4ndXNlIHN0cmljdCdcblxuLy8gSW1wb3J0IGV2ZXJ5dGhpbmdcbmltcG9ydCBjb250ZW50IGZyb20gJy4vYnBsYXllci5odG1sJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vZGVidWcuanMnXG5pbXBvcnQgJy4vYnBsYXllci5jc3MnXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXHRzcmM6ICcnLFxuXHRjb3ZlcjogJycsXG5cdHRpdGxlOiAnVW5rbm93bicsXG5cdGFydGlzdDogJ1Vua25vd24nLFxuXHRjb2xvcjogJyNBOTEyMTInLFxuXHR2b2x1bWU6IDEsXG5cdG11dGVkOiBmYWxzZSxcblx0YXV0b3BsYXk6IGZhbHNlLFxuXHRsb29wOiBmYWxzZSxcblx0c2xpbTogZmFsc2Vcbn1cblxuY29uc3QgcmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMuY2xpZW50V2lkdGggPD0gNDYwKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKFwibmFycm93X2JwbGF5ZXJcIilcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXJyb3dfYnBsYXllclwiKVxuXHR9XG59XG5cbmNvbnN0IGZvcm1hdFRpbWUgPSBmdW5jdGlvbiAoc2VjKSB7XG5cdGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWMgLyAzNjAwKVxuXHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjIC0gKGhvdXJzICogMzYwMCkpIC8gNjApXG5cdGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHNlYyAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCkpXG5cblx0bGV0IGhzID0gJydcblx0bGV0IG1zID0gJydcblx0bGV0IHNzID0gJydcblxuXHRocyA9IGAke2hvdXJzfTpgXG5cdGlmIChpc05hTihtaW51dGVzKSkgbXMgPSAnMDA6J1xuXHRlbHNlIG1zID0gYCR7bWludXRlc31gXG5cdGlmIChpc05hTihzZWNvbmRzKSkgc3MgPSAnMDAnXG5cdGVsc2Ugc3MgPSBgJHtzZWNvbmRzfWBcblx0aWYgKGhvdXJzIDwgMTApIGhzID0gYDAke2hvdXJzfTpgXG5cdGlmIChtaW51dGVzIDwgMTApIG1zID0gYDAke21pbnV0ZXN9OmBcblx0aWYgKHNlY29uZHMgPCAxMCkgc3MgPSBgMCR7c2Vjb25kc31gXG5cdGlmIChpc05hTihob3VycykgfHwgaG91cnMgPD0gMCkgaHMgPSAnJ1xuXHRyZXR1cm4gYCR7aHN9JHttc30ke3NzfWBcbn1cblxuY29uc3QgYlBsYXllciA9IGNsYXNzIHtcblx0Y29uc3RydWN0b3IoZWwsIGRhdGEpIHtcblx0XHQvLyBFbnN1cmUgZWxlbWVudFxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIHR1cm5lZCBpbnRvIGJQbGF5ZXJcblx0XHRpZiAoZWwuYnAgaW5zdGFuY2VvZiBiUGxheWVyKSByZXR1cm4gd2FybignVGhpcyBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNoZWQhJylcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsICdicCcgLCB7IHZhbHVlOiB0aGlzIH0pXG5cblx0XHRjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19lbCcsIHsgdmFsdWU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JwbGF5ZXInKSB9KVxuXG5cdFx0Y29uc3QgX3Jlc3BvbnNlID0gcmVzcG9uc2UuYmluZCh0aGlzLl9lbClcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCEoLyhzcmN8dGl0bGV8YXJ0aXN0fHNsaW18Y292ZXJ8Y29sb3J8YXV0b3BsYXl8bG9vcHxjb250cm9scykvaS50ZXN0KGVsLmF0dHJpYnV0ZXNbaV0ubmFtZSkpKSB0aGlzLl9lbC5zZXRBdHRyaWJ1dGUoZWwuYXR0cmlidXRlc1tpXS5uYW1lLCBlbC5hdHRyaWJ1dGVzW2ldLnZhbHVlKVxuXHRcdH1cblx0XHR0aGlzLl9lbC5jbGFzc0xpc3QuYWRkKCdiUGxheWVyJylcblx0XHR0aGlzLl9lbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBjb250ZW50KVxuXG5cdFx0Y29uc3Qgc3RhdHVzID0ge1xuXHRcdFx0cHJvZ3Jlc3Nkb3duOiBmYWxzZSxcblx0XHRcdHZvbHVtZWRvd246IGZhbHNlXG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGFsbCBuZWVkZWQgZWxlbWVudHNcblx0XHRjb25zdCBlbHMgPSB7XG5cdFx0XHRjb3ZlcjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyaW1nX2JwbGF5ZXInKSxcblx0XHRcdHByb2dyZXNzQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NjdGxfYnBsYXllcicpLFxuXHRcdFx0dm9sdW1lQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lY3RsX2JwbGF5ZXInKSxcblx0XHRcdHRpdGxlOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudGl0bGVfYnBsYXllcicpLFxuXHRcdFx0YXJ0aXN0OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yX2JwbGF5ZXInKSxcblx0XHRcdHBsYXllZDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnBsYXllZF9icGxheWVyJyksXG5cdFx0XHRjdXJyZW50OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudF9icGxheWVyJyksXG5cdFx0XHRsb2FkZWQ6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZWRfYnBsYXllcicpLFxuXHRcdFx0dG90YWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy50b3RhbF9icGxheWVyJyksXG5cdFx0XHR2b2x1bWVWYWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWV2YWxfYnBsYXllcicpLFxuXHRcdFx0cGxheUN0bDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyX2JwbGF5ZXInKSxcblx0XHRcdHZvbHVtZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3ZvbHVtZUJ0bl9icGxheWVyJyksXG5cdFx0XHRsb29wQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjbG9vcEJ0bl9icGxheWVyJyksXG5cdFx0XHRwbGF5QnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGxheUJ0bl9icGxheWVyJyksXG5cdFx0XHRwYXVzZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3BhdXNlQnRuX2JwbGF5ZXInKVxuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGFuIGF1ZGlvIHRhZ1xuXHRcdGlmIChlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBVURJTycpIHtcblx0XHRcdGVscy5hdWRpbyA9IGVsXG5cdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuXHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShlbCwgZWxzLmF1ZGlvKVxuXHRcdH0gZWxzZSBlbHMuYXVkaW8gPSBuZXcgQXVkaW8oKVxuXG5cdFx0Ly8gSGlkZSB0aGUgYXVkaW8gZWxlbWVudFxuXHRcdGVscy5hdWRpby5jb250cm9scyA9IGZhbHNlXG5cblx0XHQvLyBBdHRhY2ggdG8gRE9NXG5cdFx0dGhpcy5fZWwuYXBwZW5kQ2hpbGQoZWxzLmF1ZGlvKVxuXHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5fZWwsIGVsKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfcmVzcG9uc2UpXG5cdFx0X3Jlc3BvbnNlKClcblxuXHRcdGNvbnN0IHtcblx0XHRcdHByb2dyZXNzQ3RsLFxuXHRcdFx0dm9sdW1lQ3RsLFxuXHRcdFx0cGxheWVkLFxuXHRcdFx0Y3VycmVudCxcblx0XHRcdGxvYWRlZCxcblx0XHRcdHRvdGFsLFxuXHRcdFx0dm9sdW1lVmFsLFxuXHRcdFx0dm9sdW1lQnRuLFxuXHRcdFx0cGxheUN0bCxcblx0XHRcdGxvb3BCdG4sXG5cdFx0XHRwbGF5QnRuLFxuXHRcdFx0cGF1c2VCdG5cblx0XHR9ID0gZWxzXG5cblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRjb25zdCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRpZiAoeCA+PSAwICYmIHggPD0gdykgZWxzLmF1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBlbHMuYXVkaW8uZHVyYXRpb25cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHRcdHN0YXR1cy5wcm9ncmVzc2Rvd24gPSB0cnVlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdFx0c3RhdHVzLnByb2dyZXNzZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy5wcm9ncmVzc2Rvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKHN0YXR1cy5wcm9ncmVzc2Rvd24pIHtcblx0XHRcdFx0Y29uc3QgdyA9IHRoaXMuY2xpZW50V2lkdGhcblx0XHRcdFx0Y29uc3QgeCA9IGUub2Zmc2V0WFxuXHRcdFx0XHRpZiAoeCA+PSAwICYmIHggPD0gdykgZWxzLmF1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBlbHMuYXVkaW8uZHVyYXRpb25cblx0XHRcdH1cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChzdGF0dXMucHJvZ3Jlc3Nkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSB3KSBlbHMuYXVkaW8uY3VycmVudFRpbWUgPSB4IC8gdyAqIGVscy5hdWRpby5kdXJhdGlvblxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGNvbnN0IHggPSBlLm9mZnNldFhcblx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHRcdHN0YXR1cy52b2x1bWVkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcblx0XHRcdGlmIChzdGF0dXMudm9sdW1lZG93bikge1xuXHRcdFx0XHRjb25zdCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy52b2x1bWVkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHN0YXR1cy52b2x1bWVkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5fZWwubXV0ZWQgPSAhdGhpcy5fZWwubXV0ZWRcblx0XHR9KVxuXHRcdHBsYXlDdGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRpZiAoZWxzLmF1ZGlvLnBhdXNlZCkge1xuXHRcdFx0XHR0aGlzLl9lbC5wbGF5KClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2VsLnBhdXNlKClcblx0XHRcdH1cblx0XHR9KVxuXHRcdGxvb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9lbC5sb29wID0gIXRoaXMuX2VsLmxvb3Bcblx0XHR9KVxuXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXllZC5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG5cdFx0XHRjdXJyZW50LnRleHRDb250ZW50ID0gZm9ybWF0VGltZSh0aGlzLmN1cnJlbnRUaW1lKVxuXHRcdH0pXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5idWZmZXJlZC5sZW5ndGggPT09IDEpIGxvYWRlZC5zdHlsZS53aWR0aCA9IGAke3RoaXMuYnVmZmVyZWQuZW5kKDApIC8gdGhpcy5kdXJhdGlvbiAqIDEwMH0lYFxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndm9sdW1lY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2b2x1bWVWYWwuc3R5bGUud2lkdGggPSBgJHt0aGlzLnZvbHVtZSAqIDgwfXB4YFxuXHRcdH0pXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0cGF1c2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0cGF1c2VCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMubG9vcCkge1xuXHRcdFx0XHR0aGlzLnBhdXNlKClcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5fZWwsIHtcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRzcmM6IHRoaXMuc3JjLFxuXHRcdFx0XHRcdFx0Y292ZXI6IHRoaXMuY292ZXIsXG5cdFx0XHRcdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdFx0XHRcdGFydGlzdDogdGhpcy5hcnRpc3QsXG5cdFx0XHRcdFx0XHRjb2xvcjogdGhpcy5jb2xvcixcblx0XHRcdFx0XHRcdHNsaW06IHRoaXMuc2xpbSxcblx0XHRcdFx0XHRcdHZvbHVtZTogdGhpcy52b2x1bWUsXG5cdFx0XHRcdFx0XHRtdXRlZDogdGhpcy5tdXRlZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGRhdGEpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YVtpXSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0dGhpc1tpXSA9IGRhdGFbaV1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzbGltOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKCdzbGltX2JQbGF5ZXInKSAhPT0gLTFcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNsaW0pIHtcblx0XHRcdFx0XHRzbGltID0gISFzbGltXG5cdFx0XHRcdFx0aWYgKHNsaW0pIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2xpbV9iUGxheWVyJylcblx0XHRcdFx0XHRlbHNlIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpbV9iUGxheWVyJylcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNyYzoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNyYykge1xuXHRcdFx0XHRcdGVscy5hdWRpby5zcmMgPSBzcmNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvdmVyOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZS5zcGxpdCgnXCIpJylbMF0uc3BsaXQoJ3VybChcIicpWzFdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChjb3Zlcikge1xuXHRcdFx0XHRcdGVscy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtjb3Zlcn1cIilgXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy50aXRsZS50ZXh0Q29udGVudFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQodGl0bGUpIHtcblx0XHRcdFx0XHRlbHMudGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YXJ0aXN0OiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmFydGlzdC50ZXh0Q29udGVudFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXJ0aXN0KSB7XG5cdFx0XHRcdFx0ZWxzLmFydGlzdC50ZXh0Q29udGVudCA9IGFydGlzdFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29sb3I6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMucGxheWVkLnN0eWxlLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoY29sb3IpIHtcblx0XHRcdFx0XHRjb25zdCBzaGFkb3cgPSBgJHtjb2xvcn0gMHB4IDBweCAzcHhgXG5cdFx0XHRcdFx0ZWxzLnBsYXllZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcdFx0XHRcdGVscy5wbGF5ZWQuc3R5bGUuYm94U2hhZG93ID0gc2hhZG93XG5cdFx0XHRcdFx0ZWxzLnZvbHVtZVZhbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcdFx0XHRcdGVscy52b2x1bWVWYWwuc3R5bGUuYm94U2hhZG93ID0gc2hhZG93XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR2b2x1bWU6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuYXVkaW8udm9sdW1lXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldCh2b2x1bWUpIHtcblx0XHRcdFx0XHRlbHMuYXVkaW8udm9sdW1lID0gdm9sdW1lXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRtdXRlZDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5tdXRlZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQobXV0ZWQpIHtcblx0XHRcdFx0XHRtdXRlZCA9ICEhbXV0ZWRcblx0XHRcdFx0XHRlbHMuYXVkaW8ubXV0ZWQgPSBtdXRlZFxuXHRcdFx0XHRcdGlmIChtdXRlZCkgZWxzLnZvbHVtZUJ0bi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdFx0XHRlbHNlIGVscy52b2x1bWVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRsb29wOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLmxvb3Bcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGxvb3ApIHtcblx0XHRcdFx0XHRsb29wID0gISFsb29wXG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLmxvb3AgPSBsb29wXG5cdFx0XHRcdFx0aWYgKGxvb3ApIGVscy5sb29wQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0XHRcdGVsc2UgZWxzLmxvb3BCdG4uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhdXRvcGxheToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5hdXRvcGxheVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXV0b3BsYXkpIHtcblx0XHRcdFx0XHRhdXRvcGxheSA9ICEhYXV0b3BsYXlcblx0XHRcdFx0XHRlbHMuYXVkaW8uYXV0b3BsYXkgPSBhdXRvcGxheVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0cGF1c2VkOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLnBhdXNlZFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YWRkTGlzdGVuZXI6IHtcblx0XHRcdFx0dmFsdWU6ICh0eXBlLCBmbikgPT4gZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGZhbHNlKVxuXHRcdFx0fSxcblx0XHRcdHJlbW92ZUxpc3RlbmVyOiB7XG5cdFx0XHRcdHZhbHVlOiAodHlwZSwgZm4pID0+IGVscy5hdWRpby5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSlcblx0XHRcdH0sXG5cdFx0XHRwbGF5OiB7XG5cdFx0XHRcdHZhbHVlOiBlbHMuYXVkaW8ucGxheS5iaW5kKGVscy5hdWRpbylcblx0XHRcdH0sXG5cdFx0XHRwYXVzZToge1xuXHRcdFx0XHR2YWx1ZTogZWxzLmF1ZGlvLnBhdXNlLmJpbmQoZWxzLmF1ZGlvKVxuXHRcdFx0fSxcblx0XHRcdGJwOiB7XG5cdFx0XHRcdHZhbHVlOiB0aGlzXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdGlmIChkYXRhW2ldID09PSBudWxsIHx8IHR5cGVvZiBkYXRhW2ldID09PSAndW5kZWZpbmVkJykgZGF0YVtpXSA9IGRlZmF1bHRzW2ldXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cylcblx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB0aGlzW2ldKGRhdGFbaV0pXG5cdH1cblxuXHRkYXRhKGRhdGEpIHtcblx0XHRpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5kYXRhID0gZGF0YVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmRhdGFcblx0fVxuXG5cdHNsaW0oc2xpbSkge1xuXHRcdGlmICh0eXBlb2Ygc2xpbSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnNsaW0gPSBzbGltXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuc2xpbVxuXHR9XG5cblx0c3JjKHNyYykge1xuXHRcdGlmICh0eXBlb2Ygc3JjICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuc3JjID0gc3JjXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuc3JjXG5cdH1cblxuXHRjb3Zlcihjb3Zlcikge1xuXHRcdGlmICh0eXBlb2YgY292ZXIgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5jb3ZlciA9IGNvdmVyXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuY292ZXJcblx0fVxuXG5cdHRpdGxlKHRpdGxlKSB7XG5cdFx0aWYgKHR5cGVvZiB0aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnRpdGxlID0gdGl0bGVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC50aXRsZVxuXHR9XG5cblx0YXJ0aXN0KGFydGlzdCkge1xuXHRcdGlmICh0eXBlb2YgYXJ0aXN0ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuYXJ0aXN0ID0gYXJ0aXN0XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuYXJ0aXN0XG5cdH1cblxuXHRjb2xvcihjb2xvcikge1xuXHRcdGlmICh0eXBlb2YgY29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5jb2xvciA9IGNvbG9yXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuY29sb3Jcblx0fVxuXG5cdHZvbHVtZSh2b2x1bWUpIHtcblx0XHRpZiAodHlwZW9mIHZvbHVtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnZvbHVtZSA9IHZvbHVtZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLnZvbHVtZVxuXHR9XG5cblx0bXV0ZWQobXV0ZWQpIHtcblx0XHRpZiAodHlwZW9mIG11dGVkICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwubXV0ZWQgPSBtdXRlZFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLm11dGVkXG5cdH1cblxuXHRsb29wKGxvb3ApIHtcblx0XHRpZiAodHlwZW9mIGxvb3AgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5sb29wID0gbG9vcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmxvb3Bcblx0fVxuXG5cdGF1dG9wbGF5KGF1dG9wbGF5KSB7XG5cdFx0aWYgKHR5cGVvZiBhdXRvcGxheSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLmF1dG9wbGF5ID0gYXV0b3BsYXlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5hdXRvcGxheVxuXHR9XG5cblx0Z2V0IHBhdXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fZWwucGF1c2VkXG5cdH1cblxuXHRhZGRMaXN0ZW5lciguLi5hcmdzKSB7XG5cdFx0dGhpcy5fZWwuYWRkTGlzdGVuZXIoLi4uYXJncylcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0cmVtb3ZlTGlzdGVuZXIoLi4uYXJncykge1xuXHRcdHRoaXMuX2VsLnJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBsYXkoKSB7XG5cdFx0dGhpcy5fZWwucGxheSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHBhdXNlKCkge1xuXHRcdHRoaXMuX2VsLnBhdXNlKClcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Z2V0IGJwKCkge1xuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHQvLyBBdXRvbWF0aWNhbGx5IGNvbnZlcnQgYXVkaW8gdGFncyB3aXRoIFwiY29udHJvbHNcIlxuXHQvLyBhdHRyaXR1YmUgdGhhdCBoYXZlIHZhbHVlIG9mIFwiYnBsYXllclwiIGludG8gYlBsYXllci5cblx0c3RhdGljIHNjYW4oKSB7XG5cblx0XHQvKiBlc2xpbnQge25vLW5ldzogXCJvZmZcIn0gKi9cblx0XHRjb25zdCBhdWRpb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhdWRpb1tjb250cm9scz1cImJwbGF5ZXJcIl0nKVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXVkaW9MaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHRzcmM6IGF1ZGlvTGlzdFtpXS5zcmMsXG5cdFx0XHRcdGxvb3A6IGF1ZGlvTGlzdFtpXS5sb29wLFxuXHRcdFx0XHR0aXRsZTogYXVkaW9MaXN0W2ldLnRpdGxlLFxuXHRcdFx0XHRhdXRvcGxheTogYXVkaW9MaXN0W2ldLmF1dG9wbGF5LFxuXHRcdFx0XHRzbGltOiBKU09OLnBhcnNlKGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ3NsaW0nKSksXG5cdFx0XHRcdGNvdmVyOiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdjb3ZlcicpLFxuXHRcdFx0XHRjb2xvcjogYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnY29sb3InKSxcblx0XHRcdFx0YXJ0aXN0OiBhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdhcnRpc3QnKVxuXHRcdFx0fVxuXHRcdFx0bmV3IGJQbGF5ZXIoYXVkaW9MaXN0W2ldLCBkYXRhKVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgdmVyc2lvbigpIHtcblx0XHRyZXR1cm4gVkVSU0lPTlxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJQbGF5ZXJcblxuLy8gU2V0IHN0eWxlIGZvciBpbmZvXG5jb25zdCBsczEgPSBgXG5iYWNrZ3JvdW5kLWNvbG9yOiAjQTkxMjEyO1xuZm9udC13ZWlnaHQ6IGJvbGQ7XG5jb2xvcjogI0ZGRjtcbmZvbnQtc2l6ZTogMjBweDtcbmBcbmNvbnN0IGxzMiA9IGBcbmJhY2tncm91bmQtY29sb3I6ICM1MzEyMTI7XG5mb250LXdlaWdodDogYm9sZDtcbmNvbG9yOiAjRkVEQ0JBO1xuZm9udC1zaXplOiAyMHB4O1xuYFxuY29uc3QgbHMzID0gYFxuYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbmZvbnQtd2VpZ2h0OiBib2xkO1xuY29sb3I6ICNGRURDQkE7XG5mb250LXNpemU6IDEycHg7XG5gXG4vLyBTaG93IGluZm9ybWF0aW9uIHdoZW4gYlBsYXllciBsb2FkZWQgc3VjY2Vzc2Z1bGx5LlxuY29uc29sZS5sb2coYCVjIGJQbGF5ZXIgJWMgdiR7VkVSU0lPTn0gXFxuJWMgU2VlIGh0dHA6Ly9icGxheWVyLmpzLm9yZyBmb3IgZGV0YWlsLiBgLCBsczEsIGxzMiwgbHMzKVxuIl0sIm5hbWVzIjpbImNvbnN0IiwibGV0IiwidGhpcyIsImkiLCJkYXRhIiwic2xpbSIsInNyYyIsImNvdmVyIiwidGl0bGUiLCJhcnRpc3QiLCJjb2xvciIsInZvbHVtZSIsIm11dGVkIiwibG9vcCIsImF1dG9wbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFBO0FBQ3RCQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDaERBLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQSxBQUVoRCxBQUFxQjs7OztBQ05yQjtBQUNBO0FBR0EsQUFDQSxBQUNBLEFBRUFBLElBQU0sUUFBUSxHQUFHO0NBQ2hCLEdBQUcsRUFBRSxFQUFFO0NBQ1AsS0FBSyxFQUFFLEVBQUU7Q0FDVCxLQUFLLEVBQUUsU0FBUztDQUNoQixNQUFNLEVBQUUsU0FBUztDQUNqQixLQUFLLEVB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
