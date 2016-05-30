"use strict";

(function() {
	/*jshint validthis:true */
	var bPlayer = function() {
		return ('bPlayer - Ver 0.1.0 \n Please use "new" to create a bPlayer element.');
	};

	// Set bPlayer element
	var contentHTML = '<div class="info_bplayer"><div class="titlewrap_bplayer"><span class="title_bplayer">Unknown Title</span><span class="author_bplayer">Unknown Artist</span></div><div class="time_bplayer"><span class="current_bplayer">0:00</span><span class="total_bplayer">0:00</span></div><div class="buttons_bplayer"><div class="disabled_bplayer btn_bplayer" id="loopBtn_bplayer"><i class="iconfont_bplayer">&#xe600;</i></div><div class="volume_bplayer"><div class="volumebtn_bplayer btn_bplayer" id="volumeBtn_bplayer"><i class="iconfont_bplayer">&#xe602;</i></div><div class="volumebar_bplayer"><div class="volumebg_bplayer"></div><div class="volumeval_bplayer"></div><div class="volumectl_bplayer"></div></div></div></div></div><div class="cover_bplayer"><div class="coverimg_bplayer"></div><div class="controlbtn_bplayer playBtn_bplayer" id="playBtn_bplayer"><i class="iconfont_bplayer">&#xe601;</i></div><div class="controlbtn_bplayer hidden_bplayer" id="pauseBtn_bplayer"><i class="iconfont_bplayer">&#xe603;</i></div></div><div class="progress_bplayer"><div class="loaded_bplayer"></div><div class="played_bplayer"></div><div class="progressctl_bplayer"></div></div>';

	// Convert seconds to minutes
	var formatTime = function(time) {
		var formatted = new Date(time * 1000);
		var seconds = formatted.getSeconds();
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return formatted.getMinutes() + ":" + seconds;
	}

	// Replacement
	var replaceWith = function(node1, node2) {
		var parent = node1.parentNode;
		parent.replaceChild(node2, node1);
	}

	// Responsive
	var response = function() {
		if (this.clientWidth <= 460) {
			this.classList.add("narrow_bplayer");
		} else {
			this.classList.remove("narrow_bplayer");
		}
	}

	// Attach and append element
	var attach = function(element, audio) {
		var _this = this;
		if (element) {
			var volumedown = false;
			var progressdown = false;
			var playing = false;
			var bpElement = document.createElement('div');
			bpElement.className = 'bPlayer';
			bpElement.innerHTML = contentHTML;

			var songAudio;
			if (audio) {
				songAudio = audio;
			} else {
				songAudio = document.createElement('audio');
			}
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
			if (!(this.element && (this.element.nodeType !== null))) {
				throw new Error("Invalid element.");
			}
			if (this.element.bPlayer) {
				throw new Error("bPlayer already attached.");
			}
			this.element.bPlayer = true;

			this.slim = function(slim) {
				if (slim) {
					bpElement.classList.add('slim_bPlayer');
				} else {
					bpElement.classList.remove('im_bPlayer');
				}
				return _this;
			};
			this.src = function(src) {
				if (src) {
					songAudio.src = src;
					if (!songAudio.autoplay) {
						_this.pause();
					}
					current.textContent = "0:00";
					total.textContent = "0:00";
					played.style.width = 0;
					loaded.style.width = 0;
					return _this;
				} else {
					return songAudio.src;
				}
			};
			this.cover = function(url) {
				if (url) {
					songCover.style.backgroundImage = "url(\"" + url + "\")";
					return _this;
				} else {
					return songCover.style.backgroundImage;
				}
			};
			this.title = function(text) {
				if (text) {
					songTitle.textContent = text;
					return _this;
				} else {
					return songTitle.textContent;
				}
			};
			this.artist = function(text) {
				if (text) {
					songArtists.textContent = text;
					return _this;
				} else {
					return songArtists.textContent;
				}
			};
			this.color = function(color) {
				if (color) {
					played.style.backgroundColor = color;
					volumeVal.style.backgroundColor = color;
					return _this;
				} else {
					return played.style.backgroundColor;
				}
			};
			this.volume = function(volume) {
				if (volume) {
					songAudio.volume = volume;
					return _this;
				} else {
					return songAudio.volume;
				}
			};
			this.muted = function(mute) {
				if (mute === false) {
					songAudio.muted = mute;
					volumeBtn.classList.remove('disabled_bplayer');
					return _this;
				} else if (mute === true) {
					songAudio.muted = mute;
					volumeBtn.classList.add('disabled_bplayer');
					return _this;
				} else {
					return songAudio.muted;
				}
			};
			this.loop = function(loop) {
				if (loop === false) {
					songAudio.loop = loop;
					loopBtn.classList.add('disabled_bplayer');
					return _this;
				} else if (loop === true) {
					songAudio.loop = loop;
					loopBtn.classList.remove('disabled_bplayer');
					return _this;
				} else {
					return songAudio.loop;
				}
			};
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
			};
			this.play = function() {
				if (this.src() !== "" && this.src() !== null) {
					songAudio.play();
				}
				return _this;
			};
			this.pause = function() {
				songAudio.pause();
				playBtn.classList.remove('hidden_bplayer');
				pauseBtn.classList.add('hidden_bplayer');
				playing = false;
				return _this;
			};
			this.init = function() {
				this.element.appendChild(bpElement);
				response.call(bpElement);
				this.element.onselectstart = function() {
					return false;
				};
				return _this;
			};

			window.addEventListener("resize", function() {
				response.call(bpElement);
			});
			progressCtl.onclick = function(e) {
				var w = this.clientWidth;
				var x = e.offsetX;
				try {
					songAudio.currentTime = x / w * songAudio.duration;
				} catch (err) {}
			};
			progressCtl.onmousedown = function() {
				progressdown = true;
			};
			progressCtl.onmouseup = function() {
				progressdown = false;
			};
			progressCtl.onmouseout = function() {
				progressdown = false;
			};
			progressCtl.onmousemove = function(e) {
				if (progressdown) {
					var w = this.clientWidth;
					var x = e.offsetX;
					try {
						songAudio.currentTime = x / w * songAudio.duration;
					} catch (err) {}
				}
			};
			volumeCtl.onclick = function(e) {
				var x = e.offsetX + 1;
				if (x >= 0) {
					songAudio.volume = x / 80;
				}
			};
			volumeCtl.onmousedown = function() {
				volumedown = true;
			};
			volumeCtl.onmouseup = function() {
				volumedown = false;
			};
			volumeCtl.onmouseout = function() {
				volumedown = false;
			};
			volumeCtl.onmousemove = function(e) {
				if (volumedown) {
					var x = e.offsetX + 1;
					try {
						songAudio.volume = x / 80;
					} catch (err) {}
				}
			};
			volumeBtn.onclick = function() {
				if (_this.muted()) {
					_this.muted(false);
				} else {
					_this.muted(true);
				}
			};
			playCtl.onclick = function() {
				if (playing) {
					_this.pause();
				} else {
					_this.play();
				}
			};
			loopBtn.onclick = function() {
				if (_this.loop()) {
					_this.loop(false);
				} else {
					_this.loop(true);
				}
			};

			songAudio.ontimeupdate = function() {
				played.style.width = this.currentTime / this.duration * 100 + "%";
				current.textContent = formatTime(this.currentTime);
			};
			songAudio.onprogress = function() {
				try {
					loaded.style.width = this.buffered.end(this.length - 1) / this.duration * 100 + "%";
					total.textContent = formatTime(this.duration);
				} catch (err) {}
			};
			songAudio.onvolumechange = function() {
				volumeVal.style.width = this.volume * 80 + "px";
			};
			songAudio.onplay = function() {
				playBtn.classList.add('hidden_bplayer');
				pauseBtn.classList.remove('hidden_bplayer');
				total.textContent = formatTime(this.duration);
				playing = true;
			};
			songAudio.onended = function() {
				if (!_this.loop()) {
					_this.pause();
				}
			};

			return _this;
		}
	}

	bPlayer.prototype.attach = attach;
	window.bPlayer = bPlayer;

	var scan = function() {
		document.removeEventListener('DOMContentLoaded', scan, false);
		var audios = document.querySelectorAll('audio');
		for (var i = 0; i < audios.length; i++) {
			var title = '', artist = '', cover = ' ', color = '#F00', slim = false;
			if (audios[i].hasAttribute('title')) {
				title = audios[i].attributes['title'].value;
			}
			if (audios[i].hasAttribute('artist')) {
				artist = audios[i].attributes['artist'].value;
			}
			if (audios[i].hasAttribute('cover')) {
				cover = audios[i].attributes['cover'].value;
			}
			if (audios[i].hasAttribute('color')) {
				color = audios[i].attributes['color'].value;
			}
			if (audios[i].hasAttribute('slim')) {
				if (audios[i].attributes['slim'].value !== 'false') {
					slim = true;
				}
			}
			var newDiv = document.createElement('div');
			if (audios[i].hasAttribute('id')) {
				newDiv.id = audios[i].id;
			}
			replaceWith(audios[i], newDiv);
			var newbP = new bPlayer();
			newbP.attach(newDiv, audios[i]).title(title).artist(artist).cover(cover).color(color).slim(slim).init();
		}
	}

	document.addEventListener('DOMContentLoaded', scan, false);
	if (document.readyState === "interactive" || document.readyState === "complete") {
		scan();
	}
})();