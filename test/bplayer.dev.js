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

__$styleInject("@font-face {\n\tfont-family: 'iconfont_bplayer';  /* project id 67267 */\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot');\n\tsrc: url('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.eot?#iefix') format('embedded-opentype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.woff') format('woff'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.ttf') format('truetype'),\n\turl('//at.alicdn.com/t/font_ksctw5cl4pjy8pvi.svg#iconfont') format('svg');\n}\n\nbplayer {\n\tdisplay: block;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\t-khtml-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n}\n\n.iconfont_bplayer {\n\tfont-family:\"iconfont_bplayer\";\n\tfont-style:normal;\n\t-webkit-font-smoothing: antialiased;\n\t-webkit-text-stroke-width: 0.2px;\n}\n\n.bPlayer {\n\tbox-sizing: border-box;\n\tposition: relative;\n\toverflow: hidden;\n\tfont-family:\n\t\tHelvetica, Tahoma, Arial, \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"Microsoft YaHei\", STXihei, STHeiti, Heiti, SimSun, sans-serif;\n\twidth: 100%;\n\theight: 60px;\n\tbackground-color: #FFF;\n\tcursor: default;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\tcolor: #000;\n}\n\n.cover_bplayer {\n\tbackground-color: #CCC;\n\theight: 60px;\n\twidth: 60px;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n}\n.cover_bplayer:before {\n\tcontent: \"\\e605\";\n\tfont-family:\"iconfont_bplayer\";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n}\n\n.coverimg_bplayer {\n\tposition: absolute;\n\tbackground-size: cover;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.controlbtn_bplayer {\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\tline-height: 60px;\n\ttext-align: center;\n\tfont-size: 40px;\n\tcolor: #FFF;\n\tbackground-color: rgba(0,0,0,0.27);\n\topacity: 0;\n\tdisplay: block;\n\ttransition: opacity 500ms;\n}\n.controlbtn_bplayer.playBtn_bplayer {\n\topacity: 0.8;\n}\n.controlbtn_bplayer:hover {\n\topacity: 1;\n}\n\n.info_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\theight: 60px;\n\twidth: 100%;\n}\n\n.titlewrap_bplayer {\n\tpadding-left: 72px;\n\tpadding-right: 140px;\n\tline-height: 60px;\n\theight: 60px;\n\tfont-size: 20px;\n\twhite-space: nowrap;\n\ttext-align: left;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\n\n.author_bplayer {\n\tfont-size: 80%;\n\topacity: 0.8;\n}\n.author_bplayer:before {\n\tcontent: \" - \";\n}\n\n.buttons_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tfont-size: 16px;\n\tright: 0;\n}\n.btn_bplayer {\n\theight: 20px;\n\twidth: 20px;\n\tline-height: 20px;\n\ttext-align: center;\n\tmargin-right: 8px;\n\tfloat: right;\n\topacity: 1;\n\ttransition: opacity 500ms;\n}\n\n.progress_bplayer {\n\tposition: absolute;\n\tbottom: 0;\n\theight: 2px;\n\twidth: 100%;\n\ttransition: height 500ms;\n}\n.progress_bplayer:hover {\n\theight: 6px;\n}\n.loaded_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #AAA;\n\ttransition: width 300ms linear;\n}\n.played_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 0;\n\tbackground-color: #A91212;\n\ttransition: width 100ms linear;\n}\n.progressctl_bplayer {\n\tposition: absolute;\n\tleft: 0;\n\theight: 100%;\n\twidth: 100%;\n}\n\n.time_bplayer {\n\tposition: absolute;\n\ttop: 20px;\n\tright: 65px;\n\tline-height: 20px;\n\tfont-size: 12px;\n}\n.total_bplayer:before {\n\tcontent: \" / \";\n}\n\n.volume_bplayer {\n\tposition: relative;\n\tline-height: 20px;\n\theight: 20px;\n\twidth: 20px;\n\tfloat: right;\n\tmargin-right: 8px;\n\toverflow: hidden;\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\tbackground-color: #FFF;\n\ttransition: box-shadow 500ms, width 500ms;\n}\n.volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n\twidth: 105px;\n}\n.volumebtn_bplayer {\n\tfloat: right;\n\tmargin: 0;\n}\n.volumebar_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tright: 20px;\n\theight: 20px;\n\twidth: 85px;\n}\n.volumebg_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #AAA;\n}\n.volumeval_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin: 8px 0 8px 5px;\n\theight: 4px;\n\tbackground-color: #A91212;\n}\n.volumectl_bplayer {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 80px;\n\tmargin-left: 5px;\n\theight: 20px;\n}\n\n\n.disabled_bplayer {\n\topacity: 0.2;\n}\n\n.hidden_bplayer {\n\topacity: 0;\n\tdisplay: none;\n}\n\n.narrow_bplayer .buttons_bplayer {\n\ttop: 35px;\n}\n.narrow_bplayer .time_bplayer {\n\ttop: 35px;\n}\n\n.narrow_bplayer .titlewrap_bplayer {\n\tpadding-right: 0;\n\tline-height: 40px;\n\tfont-size: 16px;\n}\n\n\n/* Section for bPayer_slim */\n.bPlayer.slim_bPlayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .cover_bplayer {\n\theight: 30px;\n\twidth: 30px;\n}\n.slim_bPlayer .cover_bplayer:before {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .controlbtn_bplayer {\n\tline-height: 30px;\n\tfont-size: 20px;\n}\n\n.slim_bPlayer .info_bplayer {\n\theight: 30px;\n}\n\n.slim_bPlayer .titlewrap_bplayer {\n\tpadding-left: 38px;\n\tpadding-right: 140px;\n\tline-height: 30px;\n\theight: 30px;\n\tfont-size: 16px;\n}\n\n.slim_bPlayer .buttons_bplayer {\n\ttop: 0;\n\theight: 30px;\n}\n.slim_bPlayer .btn_bplayer {\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .time_bplayer {\n\ttop: 0;\n\theight: 30px;\n\tline-height: 30px;\n}\n\n.slim_bPlayer .volume_bplayer {\n\theight: 30px;\n\ttransition: width 500ms;\n}\n.slim_bPlayer .volume_bplayer:hover {\n\tbox-shadow: 0 0 10px rgba(0, 0, 0, 0);\n\twidth: 105px;\n}\n.slim_bPlayer .volumebar_bplayer {\n\theight: 30px;\n}\n.slim_bPlayer .volumebg_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumeval_bplayer {\n\tmargin: 13px 0 13px 5px;\n}\n.slim_bPlayer .volumectl_bplayer {\n\theight: 30px;\n}\n\n",undefined);

/* global "1.0.2.dev.c0a85f7" */
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
					els.played.style.backgroundColor = color;
					els.volumeVal.style.backgroundColor = color;
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
		return "1.0.2.dev.c0a85f7"
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
console.log(("%c bPlayer %c v" + "1.0.2.dev.c0a85f7" + " \n%c See http://bplayer.js.org for detail. "), ls1, ls2, ls3);

return bPlayer;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWJ1Zy5qcyIsIi4uL3NyYy9icGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBhcHBOYW1lID0gJ1tCUF0nXG5jb25zdCBpbmZvID0gY29uc29sZS5pbmZvLmJpbmQoY29uc29sZSwgYXBwTmFtZSlcbmNvbnN0IHdhcm4gPSBjb25zb2xlLndhcm4uYmluZChjb25zb2xlLCBhcHBOYW1lKVxuXG5leHBvcnQgeyBpbmZvLCB3YXJuIH1cbiIsIi8qIGdsb2JhbCBWRVJTSU9OICovXG4ndXNlIHN0cmljdCdcblxuLy8gSW1wb3J0IGV2ZXJ5dGhpbmdcbmltcG9ydCBjb250ZW50IGZyb20gJy4vYnBsYXllci5odG1sJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vZGVidWcuanMnXG5pbXBvcnQgJy4vYnBsYXllci5jc3MnXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXHRzcmM6ICcnLFxuXHRjb3ZlcjogJycsXG5cdHRpdGxlOiAnVW5rbm93bicsXG5cdGFydGlzdDogJ1Vua25vd24nLFxuXHRjb2xvcjogJyNBOTEyMTInLFxuXHR2b2x1bWU6IDEsXG5cdG11dGVkOiBmYWxzZSxcblx0YXV0b3BsYXk6IGZhbHNlLFxuXHRsb29wOiBmYWxzZSxcblx0c2xpbTogZmFsc2Vcbn1cblxuY29uc3QgcmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMuY2xpZW50V2lkdGggPD0gNDYwKSB7XG5cdFx0dGhpcy5jbGFzc0xpc3QuYWRkKFwibmFycm93X2JwbGF5ZXJcIilcblx0fSBlbHNlIHtcblx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXJyb3dfYnBsYXllclwiKVxuXHR9XG59XG5cbmNvbnN0IGZvcm1hdFRpbWUgPSBmdW5jdGlvbiAoc2VjKSB7XG5cdGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihzZWMgLyAzNjAwKVxuXHRjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjIC0gKGhvdXJzICogMzYwMCkpIC8gNjApXG5cdGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHNlYyAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCkpXG5cblx0bGV0IGhzID0gJydcblx0bGV0IG1zID0gJydcblx0bGV0IHNzID0gJydcblxuXHRocyA9IGAke2hvdXJzfTpgXG5cdGlmIChpc05hTihtaW51dGVzKSkgbXMgPSAnMDA6J1xuXHRlbHNlIG1zID0gYCR7bWludXRlc31gXG5cdGlmIChpc05hTihzZWNvbmRzKSkgc3MgPSAnMDAnXG5cdGVsc2Ugc3MgPSBgJHtzZWNvbmRzfWBcblx0aWYgKGhvdXJzIDwgMTApIGhzID0gYDAke2hvdXJzfTpgXG5cdGlmIChtaW51dGVzIDwgMTApIG1zID0gYDAke21pbnV0ZXN9OmBcblx0aWYgKHNlY29uZHMgPCAxMCkgc3MgPSBgMCR7c2Vjb25kc31gXG5cdGlmIChpc05hTihob3VycykgfHwgaG91cnMgPD0gMCkgaHMgPSAnJ1xuXHRyZXR1cm4gYCR7aHN9JHttc30ke3NzfWBcbn1cblxuY29uc3QgYlBsYXllciA9IGNsYXNzIHtcblx0Y29uc3RydWN0b3IoZWwsIGRhdGEpIHtcblx0XHQvLyBFbnN1cmUgZWxlbWVudFxuXHRcdGlmICghKGVsIGluc3RhbmNlb2YgRWxlbWVudCkpIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIHR1cm5lZCBpbnRvIGJQbGF5ZXJcblx0XHRpZiAoZWwuYnAgaW5zdGFuY2VvZiBiUGxheWVyKSByZXR1cm4gd2FybignVGhpcyBlbGVtZW50IGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNoZWQhJylcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsICdicCcgLCB7IHZhbHVlOiB0aGlzIH0pXG5cblx0XHRjb25zdCBwYXJlbnQgPSBlbC5wYXJlbnROb2RlXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19lbCcsIHsgdmFsdWU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JwbGF5ZXInKSB9KVxuXG5cdFx0Y29uc3QgX3Jlc3BvbnNlID0gcmVzcG9uc2UuYmluZCh0aGlzLl9lbClcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCEoLyhzcmN8dGl0bGV8YXJ0aXN0fHNsaW18Y292ZXJ8Y29sb3J8YXV0b3BsYXl8bG9vcHxjb250cm9scykvaS50ZXN0KGVsLmF0dHJpYnV0ZXNbaV0ubmFtZSkpKSB0aGlzLl9lbC5zZXRBdHRyaWJ1dGUoZWwuYXR0cmlidXRlc1tpXS5uYW1lLCBlbC5hdHRyaWJ1dGVzW2ldLnZhbHVlKVxuXHRcdH1cblx0XHR0aGlzLl9lbC5jbGFzc0xpc3QuYWRkKCdiUGxheWVyJylcblx0XHR0aGlzLl9lbC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBjb250ZW50KVxuXG5cdFx0Y29uc3Qgc3RhdHVzID0ge1xuXHRcdFx0cHJvZ3Jlc3Nkb3duOiBmYWxzZSxcblx0XHRcdHZvbHVtZWRvd246IGZhbHNlXG5cdFx0fVxuXG5cdFx0Ly8gR2V0IGFsbCBuZWVkZWQgZWxlbWVudHNcblx0XHRjb25zdCBlbHMgPSB7XG5cdFx0XHRjb3ZlcjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyaW1nX2JwbGF5ZXInKSxcblx0XHRcdHByb2dyZXNzQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3NjdGxfYnBsYXllcicpLFxuXHRcdFx0dm9sdW1lQ3RsOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lY3RsX2JwbGF5ZXInKSxcblx0XHRcdHRpdGxlOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcudGl0bGVfYnBsYXllcicpLFxuXHRcdFx0YXJ0aXN0OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuYXV0aG9yX2JwbGF5ZXInKSxcblx0XHRcdHBsYXllZDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLnBsYXllZF9icGxheWVyJyksXG5cdFx0XHRjdXJyZW50OiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudF9icGxheWVyJyksXG5cdFx0XHRsb2FkZWQ6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZWRfYnBsYXllcicpLFxuXHRcdFx0dG90YWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy50b3RhbF9icGxheWVyJyksXG5cdFx0XHR2b2x1bWVWYWw6IHRoaXMuX2VsLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWV2YWxfYnBsYXllcicpLFxuXHRcdFx0cGxheUN0bDogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignLmNvdmVyX2JwbGF5ZXInKSxcblx0XHRcdHZvbHVtZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3ZvbHVtZUJ0bl9icGxheWVyJyksXG5cdFx0XHRsb29wQnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjbG9vcEJ0bl9icGxheWVyJyksXG5cdFx0XHRwbGF5QnRuOiB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yKCcjcGxheUJ0bl9icGxheWVyJyksXG5cdFx0XHRwYXVzZUJ0bjogdGhpcy5fZWwucXVlcnlTZWxlY3RvcignI3BhdXNlQnRuX2JwbGF5ZXInKVxuXHRcdH1cblxuXHRcdC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGFuIGF1ZGlvIHRhZ1xuXHRcdGlmIChlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdBVURJTycpIHtcblx0XHRcdGVscy5hdWRpbyA9IGVsXG5cdFx0XHRlbCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuXHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShlbCwgZWxzLmF1ZGlvKVxuXHRcdH0gZWxzZSBlbHMuYXVkaW8gPSBuZXcgQXVkaW8oKVxuXG5cdFx0Ly8gSGlkZSB0aGUgYXVkaW8gZWxlbWVudFxuXHRcdGVscy5hdWRpby5jb250cm9scyA9IGZhbHNlXG5cblx0XHQvLyBBdHRhY2ggdG8gRE9NXG5cdFx0dGhpcy5fZWwuYXBwZW5kQ2hpbGQoZWxzLmF1ZGlvKVxuXHRcdHBhcmVudC5yZXBsYWNlQ2hpbGQodGhpcy5fZWwsIGVsKVxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfcmVzcG9uc2UpXG5cdFx0X3Jlc3BvbnNlKClcblxuXHRcdGNvbnN0IHtcblx0XHRcdHByb2dyZXNzQ3RsLFxuXHRcdFx0dm9sdW1lQ3RsLFxuXHRcdFx0cGxheWVkLFxuXHRcdFx0Y3VycmVudCxcblx0XHRcdGxvYWRlZCxcblx0XHRcdHRvdGFsLFxuXHRcdFx0dm9sdW1lVmFsLFxuXHRcdFx0dm9sdW1lQnRuLFxuXHRcdFx0cGxheUN0bCxcblx0XHRcdGxvb3BCdG4sXG5cdFx0XHRwbGF5QnRuLFxuXHRcdFx0cGF1c2VCdG5cblx0XHR9ID0gZWxzXG5cblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRjb25zdCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRpZiAoeCA+PSAwICYmIHggPD0gdykgZWxzLmF1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBlbHMuYXVkaW8uZHVyYXRpb25cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHRcdHN0YXR1cy5wcm9ncmVzc2Rvd24gPSB0cnVlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuXHRcdFx0c3RhdHVzLnByb2dyZXNzZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHRwcm9ncmVzc0N0bC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy5wcm9ncmVzc2Rvd24gPSBmYWxzZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0aWYgKHN0YXR1cy5wcm9ncmVzc2Rvd24pIHtcblx0XHRcdFx0Y29uc3QgdyA9IHRoaXMuY2xpZW50V2lkdGhcblx0XHRcdFx0Y29uc3QgeCA9IGUub2Zmc2V0WFxuXHRcdFx0XHRpZiAoeCA+PSAwICYmIHggPD0gdykgZWxzLmF1ZGlvLmN1cnJlbnRUaW1lID0geCAvIHcgKiBlbHMuYXVkaW8uZHVyYXRpb25cblx0XHRcdH1cblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0cHJvZ3Jlc3NDdGwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMucHJvZ3Jlc3Nkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHByb2dyZXNzQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdGlmIChzdGF0dXMucHJvZ3Jlc3Nkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHcgPSB0aGlzLmNsaWVudFdpZHRoXG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSB3KSBlbHMuYXVkaW8uY3VycmVudFRpbWUgPSB4IC8gdyAqIGVscy5hdWRpby5kdXJhdGlvblxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGNvbnN0IHggPSBlLm9mZnNldFhcblx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcblx0XHRcdHN0YXR1cy52b2x1bWVkb3duID0gdHJ1ZVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IGZhbHNlXG5cdFx0fSlcblx0XHR2b2x1bWVDdGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcblx0XHRcdGlmIChzdGF0dXMudm9sdW1lZG93bikge1xuXHRcdFx0XHRjb25zdCB4ID0gZS5vZmZzZXRYXG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQ3RsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG5cdFx0XHRzdGF0dXMudm9sdW1lZG93biA9IHRydWVcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcblx0XHRcdHN0YXR1cy52b2x1bWVkb3duID0gZmFsc2Vcblx0XHR9KVxuXHRcdHZvbHVtZUN0bC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHN0YXR1cy52b2x1bWVkb3duKSB7XG5cdFx0XHRcdGNvbnN0IHggPSBlLnRvdWNoZXNbMF0ucGFnZVggLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG5cdFx0XHRcdGlmICh4ID49IDAgJiYgeCA8PSA4MCkgZWxzLmF1ZGlvLnZvbHVtZSA9IHggLyA4MFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0dm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5fZWwubXV0ZWQgPSAhdGhpcy5fZWwubXV0ZWRcblx0XHR9KVxuXHRcdHBsYXlDdGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRpZiAoZWxzLmF1ZGlvLnBhdXNlZCkge1xuXHRcdFx0XHR0aGlzLl9lbC5wbGF5KClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2VsLnBhdXNlKClcblx0XHRcdH1cblx0XHR9KVxuXHRcdGxvb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9lbC5sb29wID0gIXRoaXMuX2VsLmxvb3Bcblx0XHR9KVxuXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXllZC5zdHlsZS53aWR0aCA9IGAke3RoaXMuY3VycmVudFRpbWUgLyB0aGlzLmR1cmF0aW9uICogMTAwfSVgXG5cdFx0XHRjdXJyZW50LnRleHRDb250ZW50ID0gZm9ybWF0VGltZSh0aGlzLmN1cnJlbnRUaW1lKVxuXHRcdH0pXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5idWZmZXJlZC5sZW5ndGggPT09IDEpIGxvYWRlZC5zdHlsZS53aWR0aCA9IGAke3RoaXMuYnVmZmVyZWQuZW5kKDApIC8gdGhpcy5kdXJhdGlvbiAqIDEwMH0lYFxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigndm9sdW1lY2hhbmdlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2b2x1bWVWYWwuc3R5bGUud2lkdGggPSBgJHt0aGlzLnZvbHVtZSAqIDgwfXB4YFxuXHRcdH0pXG5cdFx0ZWxzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXlCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0cGF1c2VCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHBsYXlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0cGF1c2VCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuX2JwbGF5ZXInKVxuXHRcdFx0dG90YWwudGV4dENvbnRlbnQgPSBmb3JtYXRUaW1lKHRoaXMuZHVyYXRpb24pXG5cdFx0fSlcblx0XHRlbHMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMubG9vcCkge1xuXHRcdFx0XHR0aGlzLnBhdXNlKClcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy5fZWwsIHtcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRzcmM6IHRoaXMuc3JjLFxuXHRcdFx0XHRcdFx0Y292ZXI6IHRoaXMuY292ZXIsXG5cdFx0XHRcdFx0XHR0aXRsZTogdGhpcy50aXRsZSxcblx0XHRcdFx0XHRcdGFydGlzdDogdGhpcy5hcnRpc3QsXG5cdFx0XHRcdFx0XHRjb2xvcjogdGhpcy5jb2xvcixcblx0XHRcdFx0XHRcdHNsaW06IHRoaXMuc2xpbSxcblx0XHRcdFx0XHRcdHZvbHVtZTogdGhpcy52b2x1bWUsXG5cdFx0XHRcdFx0XHRtdXRlZDogdGhpcy5tdXRlZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGRhdGEpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRcdFx0XHRpZiAoZGF0YVtpXSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0dGhpc1tpXSA9IGRhdGFbaV1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzbGltOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKCdzbGltX2JQbGF5ZXInKSAhPT0gLTFcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNsaW0pIHtcblx0XHRcdFx0XHRzbGltID0gISFzbGltXG5cdFx0XHRcdFx0aWYgKHNsaW0pIHRoaXMuY2xhc3NMaXN0LmFkZCgnc2xpbV9iUGxheWVyJylcblx0XHRcdFx0XHRlbHNlIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc2xpbV9iUGxheWVyJylcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNyYzoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KHNyYykge1xuXHRcdFx0XHRcdGVscy5hdWRpby5zcmMgPSBzcmNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNvdmVyOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmNvdmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZS5zcGxpdCgnXCIpJylbMF0uc3BsaXQoJ3VybChcIicpWzFdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChjb3Zlcikge1xuXHRcdFx0XHRcdGVscy5jb3Zlci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtjb3Zlcn1cIilgXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHR0aXRsZToge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy50aXRsZS50ZXh0Q29udGVudFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQodGl0bGUpIHtcblx0XHRcdFx0XHRlbHMudGl0bGUudGV4dENvbnRlbnQgPSB0aXRsZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YXJ0aXN0OiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmFydGlzdC50ZXh0Q29udGVudFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoYXJ0aXN0KSB7XG5cdFx0XHRcdFx0ZWxzLmFydGlzdC50ZXh0Q29udGVudCA9IGFydGlzdFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29sb3I6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMucGxheWVkLnN0eWxlLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQoY29sb3IpIHtcblx0XHRcdFx0XHRlbHMucGxheWVkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFx0XHRcdFx0ZWxzLnZvbHVtZVZhbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0dm9sdW1lOiB7XG5cdFx0XHRcdGdldCgpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxzLmF1ZGlvLnZvbHVtZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZXQodm9sdW1lKSB7XG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLnZvbHVtZSA9IHZvbHVtZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bXV0ZWQ6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuYXVkaW8ubXV0ZWRcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KG11dGVkKSB7XG5cdFx0XHRcdFx0bXV0ZWQgPSAhIW11dGVkXG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLm11dGVkID0gbXV0ZWRcblx0XHRcdFx0XHRpZiAobXV0ZWQpIGVscy52b2x1bWVCdG4uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWRfYnBsYXllcicpXG5cdFx0XHRcdFx0ZWxzZSBlbHMudm9sdW1lQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0bG9vcDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5sb29wXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNldChsb29wKSB7XG5cdFx0XHRcdFx0bG9vcCA9ICEhbG9vcFxuXHRcdFx0XHRcdGVscy5hdWRpby5sb29wID0gbG9vcFxuXHRcdFx0XHRcdGlmIChsb29wKSBlbHMubG9vcEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZF9icGxheWVyJylcblx0XHRcdFx0XHRlbHNlIGVscy5sb29wQnRuLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkX2JwbGF5ZXInKVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YXV0b3BsYXk6IHtcblx0XHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRcdHJldHVybiBlbHMuYXVkaW8uYXV0b3BsYXlcblx0XHRcdFx0fSxcblx0XHRcdFx0c2V0KGF1dG9wbGF5KSB7XG5cdFx0XHRcdFx0YXV0b3BsYXkgPSAhIWF1dG9wbGF5XG5cdFx0XHRcdFx0ZWxzLmF1ZGlvLmF1dG9wbGF5ID0gYXV0b3BsYXlcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHBhdXNlZDoge1xuXHRcdFx0XHRnZXQoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVscy5hdWRpby5wYXVzZWRcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGFkZExpc3RlbmVyOiB7XG5cdFx0XHRcdHZhbHVlOiAodHlwZSwgZm4pID0+IGVscy5hdWRpby5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZuLCBmYWxzZSlcblx0XHRcdH0sXG5cdFx0XHRyZW1vdmVMaXN0ZW5lcjoge1xuXHRcdFx0XHR2YWx1ZTogKHR5cGUsIGZuKSA9PiBlbHMuYXVkaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgZmFsc2UpXG5cdFx0XHR9LFxuXHRcdFx0cGxheToge1xuXHRcdFx0XHR2YWx1ZTogZWxzLmF1ZGlvLnBsYXkuYmluZChlbHMuYXVkaW8pXG5cdFx0XHR9LFxuXHRcdFx0cGF1c2U6IHtcblx0XHRcdFx0dmFsdWU6IGVscy5hdWRpby5wYXVzZS5iaW5kKGVscy5hdWRpbylcblx0XHRcdH0sXG5cdFx0XHRicDoge1xuXHRcdFx0XHR2YWx1ZTogdGhpc1xuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBkZWZhdWx0cykge1xuXHRcdFx0XHRpZiAoZGF0YVtpXSA9PT0gbnVsbCB8fCB0eXBlb2YgZGF0YVtpXSA9PT0gJ3VuZGVmaW5lZCcpIGRhdGFbaV0gPSBkZWZhdWx0c1tpXVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBkYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMpXG5cdFx0Zm9yIChsZXQgaSBpbiBkZWZhdWx0cykgdGhpc1tpXShkYXRhW2ldKVxuXHR9XG5cblx0ZGF0YShkYXRhKSB7XG5cdFx0aWYgKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuZGF0YSA9IGRhdGFcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5kYXRhXG5cdH1cblxuXHRzbGltKHNsaW0pIHtcblx0XHRpZiAodHlwZW9mIHNsaW0gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5zbGltID0gc2xpbVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLnNsaW1cblx0fVxuXG5cdHNyYyhzcmMpIHtcblx0XHRpZiAodHlwZW9mIHNyYyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLnNyYyA9IHNyY1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLnNyY1xuXHR9XG5cblx0Y292ZXIoY292ZXIpIHtcblx0XHRpZiAodHlwZW9mIGNvdmVyICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuY292ZXIgPSBjb3ZlclxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmNvdmVyXG5cdH1cblxuXHR0aXRsZSh0aXRsZSkge1xuXHRcdGlmICh0eXBlb2YgdGl0bGUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC50aXRsZSA9IHRpdGxlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwudGl0bGVcblx0fVxuXG5cdGFydGlzdChhcnRpc3QpIHtcblx0XHRpZiAodHlwZW9mIGFydGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLmFydGlzdCA9IGFydGlzdFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmFydGlzdFxuXHR9XG5cblx0Y29sb3IoY29sb3IpIHtcblx0XHRpZiAodHlwZW9mIGNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwuY29sb3IgPSBjb2xvclxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2VsLmNvbG9yXG5cdH1cblxuXHR2b2x1bWUodm9sdW1lKSB7XG5cdFx0aWYgKHR5cGVvZiB2b2x1bWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC52b2x1bWUgPSB2b2x1bWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC52b2x1bWVcblx0fVxuXG5cdG11dGVkKG11dGVkKSB7XG5cdFx0aWYgKHR5cGVvZiBtdXRlZCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuX2VsLm11dGVkID0gbXV0ZWRcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5tdXRlZFxuXHR9XG5cblx0bG9vcChsb29wKSB7XG5cdFx0aWYgKHR5cGVvZiBsb29wICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5fZWwubG9vcCA9IGxvb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9lbC5sb29wXG5cdH1cblxuXHRhdXRvcGxheShhdXRvcGxheSkge1xuXHRcdGlmICh0eXBlb2YgYXV0b3BsYXkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9lbC5hdXRvcGxheSA9IGF1dG9wbGF5XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZWwuYXV0b3BsYXlcblx0fVxuXG5cdGdldCBwYXVzZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2VsLnBhdXNlZFxuXHR9XG5cblx0YWRkTGlzdGVuZXIoLi4uYXJncykge1xuXHRcdHRoaXMuX2VsLmFkZExpc3RlbmVyKC4uLmFyZ3MpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdHJlbW92ZUxpc3RlbmVyKC4uLmFyZ3MpIHtcblx0XHR0aGlzLl9lbC5yZW1vdmVMaXN0ZW5lciguLi5hcmdzKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRwbGF5KCkge1xuXHRcdHRoaXMuX2VsLnBsYXkoKVxuXHRcdHJldHVybiB0aGlzXG5cdH1cblxuXHRwYXVzZSgpIHtcblx0XHR0aGlzLl9lbC5wYXVzZSgpXG5cdFx0cmV0dXJuIHRoaXNcblx0fVxuXG5cdGdldCBicCgpIHtcblx0XHRyZXR1cm4gdGhpc1xuXHR9XG5cblx0Ly8gQXV0b21hdGljYWxseSBjb252ZXJ0IGF1ZGlvIHRhZ3Mgd2l0aCBcImNvbnRyb2xzXCJcblx0Ly8gYXR0cml0dWJlIHRoYXQgaGF2ZSB2YWx1ZSBvZiBcImJwbGF5ZXJcIiBpbnRvIGJQbGF5ZXIuXG5cdHN0YXRpYyBzY2FuKCkge1xuXG5cdFx0LyogZXNsaW50IHtuby1uZXc6IFwib2ZmXCJ9ICovXG5cdFx0Y29uc3QgYXVkaW9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXVkaW9bY29udHJvbHM9XCJicGxheWVyXCJdJylcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGF1ZGlvTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdFx0c3JjOiBhdWRpb0xpc3RbaV0uc3JjLFxuXHRcdFx0XHRsb29wOiBhdWRpb0xpc3RbaV0ubG9vcCxcblx0XHRcdFx0dGl0bGU6IGF1ZGlvTGlzdFtpXS50aXRsZSxcblx0XHRcdFx0YXV0b3BsYXk6IGF1ZGlvTGlzdFtpXS5hdXRvcGxheSxcblx0XHRcdFx0c2xpbTogSlNPTi5wYXJzZShhdWRpb0xpc3RbaV0uZ2V0QXR0cmlidXRlKCdzbGltJykpLFxuXHRcdFx0XHRjb3ZlcjogYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnY292ZXInKSxcblx0XHRcdFx0Y29sb3I6IGF1ZGlvTGlzdFtpXS5nZXRBdHRyaWJ1dGUoJ2NvbG9yJyksXG5cdFx0XHRcdGFydGlzdDogYXVkaW9MaXN0W2ldLmdldEF0dHJpYnV0ZSgnYXJ0aXN0Jylcblx0XHRcdH1cblx0XHRcdG5ldyBiUGxheWVyKGF1ZGlvTGlzdFtpXSwgZGF0YSlcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHZlcnNpb24oKSB7XG5cdFx0cmV0dXJuIFZFUlNJT05cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBiUGxheWVyXG5cbi8vIFNldCBzdHlsZSBmb3IgaW5mb1xuY29uc3QgbHMxID0gYFxuYmFja2dyb3VuZC1jb2xvcjogI0E5MTIxMjtcbmZvbnQtd2VpZ2h0OiBib2xkO1xuY29sb3I6ICNGRkY7XG5mb250LXNpemU6IDIwcHg7XG5gXG5jb25zdCBsczIgPSBgXG5iYWNrZ3JvdW5kLWNvbG9yOiAjNTMxMjEyO1xuZm9udC13ZWlnaHQ6IGJvbGQ7XG5jb2xvcjogI0ZFRENCQTtcbmZvbnQtc2l6ZTogMjBweDtcbmBcbmNvbnN0IGxzMyA9IGBcbmJhY2tncm91bmQtY29sb3I6ICMwMDA7XG5mb250LXdlaWdodDogYm9sZDtcbmNvbG9yOiAjRkVEQ0JBO1xuZm9udC1zaXplOiAxMnB4O1xuYFxuLy8gU2hvdyBpbmZvcm1hdGlvbiB3aGVuIGJQbGF5ZXIgbG9hZGVkIHN1Y2Nlc3NmdWxseS5cbmNvbnNvbGUubG9nKGAlYyBiUGxheWVyICVjIHYke1ZFUlNJT059IFxcbiVjIFNlZSBodHRwOi8vYnBsYXllci5qcy5vcmcgZm9yIGRldGFpbC4gYCwgbHMxLCBsczIsIGxzMylcbiJdLCJuYW1lcyI6WyJjb25zdCIsImxldCIsInRoaXMiLCJpIiwiZGF0YSIsInNsaW0iLCJzcmMiLCJjb3ZlciIsInRpdGxlIiwiYXJ0aXN0IiwiY29sb3IiLCJ2b2x1bWUiLCJtdXRlZCIsImxvb3AiLCJhdXRvcGxheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUFBLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQTtBQUN0QkEsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ2hEQSxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUEsQUFFaEQsQUFBcUI7Ozs7QUNOckI7QUFDQTtBQUdBLEFBQ0EsQUFDQSxBQUVBQSxJQUFNLFFBQVEsR0FBRztDQUNoQixHQUFHLEVBQUUsRUFBRTtDQUNQLEtBQUssRUFBRSxFQUFFO0NBQ1QsS0FBSyxFQUFFLFNBQVM7Q0FDaEIsTUFBTSxFQUFFLFNBQVM7Q0FDakIsS0FBSyxFQUFFLFNBQVM7Q0FDaEIsTUFBTSxFQUFFLENBQUM7Q0FDVCxLQUFLLEVBQUUsS0FBSztDQUNaLFFBQVEsRUFBRSxLQUFLO0NBQ2YsSUFBSSxFQUFFLEtBQUs7Q0FDWCxJQUFJLEVBQUUsS0FBSztDQUNYLENBQUE7O0FBRURBLElBQU0sUUFBUSxHQUFHLFdBQVc7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
