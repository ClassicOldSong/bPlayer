(function() {
	"use strict";
	var bPlayer = function() {
		return ('bPlayer - Ver 0.1.0 \n Please use "new" to create a bPlayer element.');
	}

	// Set bPlayer element
	var contentHTML = '<div class="info_bplayer"><div class="titlewrap_bplayer"><span class="title_bplayer">Unknown Title</span><span class="author_bplayer">Unknown Artist</span></div><div class="time_bplayer"><span class="current_bplayer">00:00</span><span class="total_bplayer">00:00</span></div><div class="buttons_bplayer"><div class="disabled_bplayer btn_bplayer" id="loopBtn_bplayer"><i class="iconfont_bplayer">&#xe600;</i></div><div class="volume_bplayer"><div class="volumebtn_bplayer btn_bplayer" id="volumeBtn_bplayer"><i class="iconfont_bplayer">&#xe602;</i></div><div class="volumebar_bplayer"><div class="volumebg_bplayer"></div><div class="volumeval_bplayer"></div><div class="volumectl_bplayer"></div></div></div></div></div><div class="cover_bplayer"><div class="coverimg_bplayer"></div><div class="controlbtn_bplayer" id="playBtn_bplayer"><i class="iconfont_bplayer">&#xe601;</i></div><div class="controlbtn_bplayer hidden_bplayer" id="pauseBtn_bplayer"><i class="iconfont_bplayer">&#xe603;</i></div></div><div class="progress_bplayer"><div class="loaded_bplayer"></div><div class="played_bplayer"></div><div class="progressctl_bplayer"></div></div>';

	// Convert seconds to minutes
	function formatTime(time) {
		var formatted = new Date(time * 1000);
		var seconds = formatted.getSeconds();
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return formatted.getMinutes() + ":" + seconds;
	}


	// Modify classes
	function addClass(className) {
		var currentClass = this.className;
		if (currentClass.match(className) == null) {
			this.className = currentClass + " " + className;
		}
		return this.className;
	}

	function removeClass(className) {
		var currentClass = this.className;
		this.className = currentClass.replace(className, "").trim();
		return this.className;
	}

	// Attach and append element
	function attach(element) {
		var _this = this;
		if (element) {
			var volumedown = false;
			var progressdown = false;
			var playing = false;
			var bpElement = document.createElement('div');
			bpElement.className = 'bPlayer';
			bpElement.innerHTML = contentHTML;

			var songAudio = document.createElement('audio');
			var songCover = bpElement.querySelector(".coverimg_bplayer");
			var progressCtl = bpElement.querySelector(".progressctl_bplayer");
			var volumeCtl = bpElement.querySelector(".volumectl_bplayer");
			var songTitle = bpElement.querySelector(".title_bplayer");
			var songArtists = bpElement.querySelector(".author_bplayer");
			var played = bpElement.querySelector(".played_bplayer");
			var current = bpElement.querySelector(".current_bplayer");
			var loaded = bpElement.querySelector(".loaded_bplayer");
			var total = bpElement.querySelector(".total_bplayer");
			var volumeVal = bpElement.querySelector(".volumeval_bplayer");
			var playCtl = bpElement.querySelector(".cover_bplayer");
			var volumeBtn = bpElement.querySelector("#volumeBtn_bplayer");
			var loopBtn = bpElement.querySelector("#loopBtn_bplayer");
			var playBtn = bpElement.querySelector("#playBtn_bplayer");
			var pauseBtn = bpElement.querySelector("#pauseBtn_bplayer");

			this.element = element;
			if (typeof element === "string") {
				this.element = document.querySelector(this.element);
			}
			if (!(this.element && (this.element.nodeType != null))) {
				throw new Error("Invalid element.");
			}
			if (this.element.bPlayer) {
				throw new Error("bPlayer already attached.");
			}
			this.element.bPlayer = true;

			this.src = function(src) {
				if (src) {
					songAudio.src = src;
					return _this;
				} else {
					return songAudio.src;
				}
			}
			this.cover = function(url) {
				if (url) {
					songCover.style.backgroundImage = "url(\"" + url + "\")";
					return _this;
				} else {
					return songCover.style.backgroundImage;
				}
			}
			this.title = function(text) {
				if (text) {
					songTitle.textContent = text;
					return _this;
				} else {
					return songTitle.textContent;
				}
			}
			this.artist = function(text) {
				if (text) {
					songArtists.textContent = text;
					return _this;
				} else {
					return songArtists.textContent;
				}
			}
			this.color = function(color) {
				if (color) {
					played.style.backgroundColor = color;
					volumeVal.style.backgroundColor = color;
					return _this;
				} else {
					return played.style.backgroundColor;
				}
			}
			this.volume = function(volume) {
				if (volume) {
					songAudio.volume = volume;
					return _this;
				} else {
					return songAudio.volume;
				}
			}
			this.muted = function(mute) {
				if (mute === false) {
					songAudio.muted = mute;
					removeClass.call(volumeBtn, 'disabled_bplayer');
					return _this;
				} else if (mute === true) {
					songAudio.muted = mute;
					addClass.call(volumeBtn, 'disabled_bplayer');
					return _this;
				} else {
					return songAudio.muted;
				}
			}
			this.loop = function(loop) {
				if (loop === false) {
					songAudio.loop = loop;
					addClass.call(loopBtn, 'disabled_bplayer');
					return _this;
				} else if (loop === true) {
					songAudio.loop = loop;
					removeClass.call(loopBtn, 'disabled_bplayer');
					return _this;
				} else {
					return songAudio.loop;
				}
			}
			this.autoplay = function(autoplay) {
				if (autoplay === false) {
					songAudio.autoplay = autoplay;
					return _this;
				} else if (autoplay === true) {
					songAudio.autoplay = autoplay;
					return _this;
				} else {
					return songAudio.autoplay;
				}
			}
			this.play = function() {
				songAudio.play();
				return _this;
			}
			this.pause = function() {
				songAudio.pause();
				removeClass.call(playBtn, 'hidden_bplayer');
				addClass.call(pauseBtn, 'hidden_bplayer');
				playing = false;
				return _this;
			}
			this.init = function() {
				this.element.appendChild(bpElement);
				this.element.onselectstart = function() {
					return false;
				}
				return _this;
			}

			progressCtl.onclick = function(e) {
				var w = this.clientWidth;
				var x = e.offsetX;
				try {
					songAudio.currentTime = x / w * songAudio.duration;
				} catch (err) {}
			}
			progressCtl.onmousedown = function() {
				progressdown = true;
			}
			progressCtl.onmouseup = function() {
				progressdown = false;
			}
			progressCtl.onmouseout = function() {
				progressdown = false;
			}
			progressCtl.onmousemove = function(e) {
				if (progressdown) {
					var w = this.clientWidth;
					var x = e.offsetX;
					try {
						songAudio.currentTime = x / w * songAudio.duration;
					} catch (err) {}
				}
			}
			volumeCtl.onclick = function(e) {
				var x = e.offsetX + 1;
				if (x >= 0) {
					songAudio.volume = x / 80;
				}
			}
			volumeCtl.onmousedown = function() {
				volumedown = true;
			}
			volumeCtl.onmouseup = function() {
				volumedown = false;
			}
			volumeCtl.onmouseout = function() {
				volumedown = false;
			}
			volumeCtl.onmousemove = function(e) {
				if (volumedown) {
					var x = e.offsetX + 1;
					try {
						songAudio.volume = x / 80;
					} catch (err) {}
				}
			}
			volumeBtn.onclick = function() {
				if (_this.muted()) {
					_this.muted(false);
				} else {
					_this.muted(true);
				}
			}
			playCtl.onclick = function() {
				if (playing) {
					_this.pause();
				} else {
					_this.play();
				}
			}
			loopBtn.onclick = function() {
				if (_this.loop()) {
					_this.loop(false);
				} else {
					_this.loop(true);
				}
			}

			songAudio.ontimeupdate = function() {
				played.style.width = this.currentTime / this.duration * 100 + "%";
				current.textContent = formatTime(this.currentTime);
			}
			songAudio.onprogress = function() {
				try {
					loaded.style.width = this.buffered.end(this.length - 1) / this.duration * 100 + "%";
					total.textContent = formatTime(this.duration);
				} catch (err) {};
			}
			songAudio.onvolumechange = function() {
				volumeVal.style.width = this.volume * 80 + "px";
			}
			songAudio.onplay = function() {
				addClass.call(playBtn, 'hidden_bplayer');
				removeClass.call(pauseBtn, 'hidden_bplayer');
				total.textContent = formatTime(this.duration);
				playing = true;
			}
			songAudio.onended = function() {
				if (!_this.loop()) {
					_this.pause();
				}
			}

			return _this;
		}
	}

	window.bPlayer = bPlayer;
	bPlayer.prototype.attach = attach;

}).call(this);