/* global VERSION define*/
'use strict'

// Import everything
import content from './bplayer.html'
import css from './bplayer.css'
import { info, warn } from './debug.js'

window.bps = css

const defaults = {
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
}

const response = function() {
	if (this.clientWidth <= 460) {
		this.classList.add("narrow_bplayer")
	} else {
		this.classList.remove("narrow_bplayer")
	}
}

const formatTime = function (sec) {
	const hours = Math.floor(sec / 3600)
	const minutes = Math.floor((sec - (hours * 3600)) / 60)
	const seconds = Math.floor(sec - (hours * 3600) - (minutes * 60))

	let hs = `${hours}:`
	let ms = `${minutes}:`
	let ss = `${seconds}`

	if (hours < 10) hs = `0${hours}:`
	if (minutes < 10) ms = `0${minutes}:`
	if (seconds < 10) ss = `0${seconds}`
	if (hours <= 0) hs = ''
	return `${hs}${ms}${ss}`
}

const bPlayer = class {
	constructor(el, data) {

		/* eslint {consistent-this: "off"} */
		const _this = this

		if (!(el instanceof Element)) el = document.querySelector(el)

		// Check if the element has been turned into bPlayer
		if (el.bp instanceof bPlayer) return warn('This element has already been attached!')

		// Mark the element incase of attach again
		el.bp = this

		const parent = el.parentNode

		Object.defineProperty(this, '_el', { value: document.createElement('bplayer') })
		this._el.bp = this

		const _response = response.bind(this._el)

		for (let i = 0; i < el.attributes.length; i++) {
			if (!(/(src|title|artist|slim|cover|color|autoplay|loop|controls)/i.test(el.attributes[i].name))) this._el.setAttribute(el.attributes[i].name, el.attributes[i].value)
		}
		this._el.classList.add('bPlayer')
		this._el.insertAdjacentHTML('afterbegin', content)

		// Check if the element is an audio tag
		if (el.tagName.toUpperCase() === 'AUDIO') {
			Object.defineProperty(this, '_audio', { value: el })
			el = document.createTextNode('')
			parent.insertBefore(el, this._audio)
		} else Object.defineProperty(this, '_audio', { value: new Audio() })

		// Hide the audio element
		this._audio.controls = false

		// Attach to DOM
		this._el.appendChild(this._audio)
		parent.replaceChild(this._el, el)
		window.addEventListener('resize', _response)
		_response()


		Object.defineProperty(this, '_status', {
			value: {
				progressdown: false,
				volumedown: false
			}
		})

		// Get all needed elements
		Object.defineProperty(this, '_els', {
			value: {
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
			}
		})

		const {
			progressCtl,
			volumeCtl,
			played,
			current,
			loaded,
			total,
			volumeVal,
			volumeBtn,
			playCtl,
			loopBtn,
			playBtn,
			pauseBtn
		} = this._els

		progressCtl.addEventListener('click', function(e) {
			const w = this.clientWidth
			const x = e.offsetX
			_this._audio.currentTime = x / w * _this._audio.duration
		})
		progressCtl.addEventListener('mousedown', () => {
			_this._status.progressdown = true
		})
		progressCtl.addEventListener('mouseup', () => {
			_this._status.progressdown = false
		})
		progressCtl.addEventListener('mouseout', () => {
			_this._status.progressdown = false
		})
		progressCtl.addEventListener('mousemove', function(e) {
			if (_this._status.progressdown) {
				let w = this.clientWidth
				let x = e.offsetX
				_this._audio.currentTime = x / w * _this._audio.duration
			}
		})
		progressCtl.addEventListener('touchstart', () => {
			_this._status.progressdown = true
		})
		progressCtl.addEventListener('touchend', () => {
			_this._status.progressdown = false
		})
		progressCtl.addEventListener('touchmove', function(e) {
			if (_this._status.progressdown) {
				let w = this.clientWidth
				let x = e.touches[0].pageX - e.target.getBoundingClientRect().left
				_this._audio.currentTime = x / w * _this._audio.duration
			}
		})
		volumeCtl.addEventListener('click', (e) => {
			let x = e.offsetX + 1
			if (x >= 0) {
				_this._audio.volume = x / 80
			}
		})
		volumeCtl.addEventListener('mousedown', () => {
			_this._status.volumedown = true
		})
		volumeCtl.addEventListener('mouseup', () => {
			_this._status.volumedown = false
		})
		volumeCtl.addEventListener('mouseout', () => {
			_this._status.volumedown = false
		})
		volumeCtl.addEventListener('mousemove', (e) => {
			if (_this._status.volumedown) {
				let x = e.offsetX + 1
				this._audio.volume = x / 80
			}
		})
		volumeCtl.addEventListener('touchstart', () => {
			_this._status.volumedown = true
		})
		volumeCtl.addEventListener('touchend', () => {
			_this._status.volumedown = false
		})
		volumeCtl.addEventListener('touchmove', (e) => {
			if (_this._status.volumedown) {
				let x = e.touches[0].pageX - e.target.getBoundingClientRect().left + 1
				_this._audio.volume = x / 80
			}
		})
		volumeBtn.addEventListener('click', () => {
			_this.muted(!_this.muted())
		})
		playCtl.addEventListener('click', () => {
			if (this._audio.paused) {
				_this.play()
			} else {
				_this.pause()
			}
		})
		loopBtn.addEventListener('click', () => {
			_this.loop(!_this.loop())
		})

		_this._audio.addEventListener('timeupdate', function() {
			played.style.width = `${this.currentTime / this.duration * 100}%`
			current.textContent = formatTime(this.currentTime)
		})
		_this._audio.addEventListener('progress', function() {
			loaded.style.width = `${this.buffered.end(this.length - 1) / this.duration * 100}%`
			total.textContent = formatTime(this.duration)
		})
		_this._audio.addEventListener('volumechange', function() {
			volumeVal.style.width = `${this.volume * 80}px`
		})
		_this._audio.addEventListener('play', function() {
			playBtn.classList.add('hidden_bplayer')
			pauseBtn.classList.remove('hidden_bplayer')
			total.textContent = formatTime(this.duration)
		})
		_this._audio.addEventListener('pause', function() {
			playBtn.classList.remove('hidden_bplayer')
			pauseBtn.classList.add('hidden_bplayer')
			total.textContent = formatTime(this.duration)
		})
		_this._audio.addEventListener('ended', () => {
			if (!this.loop) {
				this.pause()
			}
		})

		Object.defineProperties(this._el, {
			data: {
				get() {
					return _this.data()
				},
				set(data) {
					_this.data(data)
				}
			},
			slim: {
				get() {
					return _this.slim()
				},
				set(slim) {
					_this.slim(slim)
				}
			},
			src: {
				get() {
					return _this.src()
				},
				set(src) {
					_this.src(src)
				}
			},
			cover: {
				get() {
					return _this.cover()
				},
				set(cover) {
					_this.cover(cover)
				}
			},
			title: {
				get() {
					return _this.title()
				},
				set(title) {
					_this.title(title)
				}
			},
			artist: {
				get() {
					return _this.artist()
				},
				set(artist) {
					_this.artist(artist)
				}
			},
			color: {
				get() {
					return _this.color()
				},
				set(color) {
					_this.color(color)
				}
			},
			volume: {
				get() {
					return _this.volume()
				},
				set(volume) {
					_this.volume(volume)
				}
			},
			muted: {
				get() {
					return _this.muted()
				},
				set(muted) {
					_this.muted(muted)
				}
			},
			loop: {
				get() {
					return _this.loop()
				},
				set(loop) {
					_this.loop(loop)
				}
			},
			autoplay: {
				get() {
					return _this.autoplay()
				},
				set(autoplay) {
					_this.autoplay(autoplay)
				}
			},
			paused: {
				get() {
					return _this._audio.paused
				}
			},
			addListener: {
				value: _this.addListener
			},
			removeListener: {
				value: _this.removeListener
			}
		})

		if (data) {
			for (let i in defaults) {
				if (data[i] === null || typeof data[i] === 'undefined') data[i] = defaults[i]
			}
		} else data = Object.assign({}, defaults)
		for (let i in defaults) this[i](data[i])
	}

	data(data) {
		if (typeof data !== 'undefined') {
			for (let i in defaults) {
				if (data[i] !== null && typeof data[i] !== 'undefined') {
					this[i](data[i])
				}
			}
			return this
		}
		return {
			src: this.src(),
			cover: this.cover(),
			title: this.title(),
			artist: this.artist(),
			color: this.color(),
			slim: this.slim(),
			volume: this.volume(),
			muted: this.muted()
		}
	}

	src(src) {
		if (typeof src !== 'undefined') {
			this._audio.src = src
			return this
		}
		return this._audio.src
	}

	cover(cover) {
		if (typeof cover !== 'undefined') {
			this._els.cover.style.backgroundImage = `url("${cover}")`
			return this
		}
		return this._els.cover.style.backgroundImage.split('")')[0].split('url("')[1]
	}

	title(title) {
		if (typeof title !== 'undefined') {
			this._els.title.textContent = title
			return this
		}
		return this._els.title.textContent
	}

	artist(artist) {
		if (typeof artist !== 'undefined') {
			this._els.artist.textContent = artist
			return this
		}
		return this._els.artist.textContent
	}

	color(color) {
		if (typeof color !== 'undefined') {
			this._els.played.style.backgroundColor = color
			this._els.volumeVal.style.backgroundColor = color
			return this
		}
		return this._els.played.style.backgroundColor
	}

	slim(slim) {
		if (typeof slim !== 'undefined') {
			slim = !!slim
			if (slim) this._el.classList.add('slim_bPlayer')
			else this._el.classList.remove('slim_bPlayer')
			return this
		}
		return this._el.className.split(' ').indexOf('slim_bPlayer') !== -1
	}

	muted(muted) {
		if (typeof muted !== 'undefined') {
			muted = !!muted
			this._audio.muted = muted
			if (muted) this._els.volumeBtn.classList.add('disabled_bplayer')
			else this._els.volumeBtn.classList.remove('disabled_bplayer')
			return this
		}
		return this._audio.muted
	}

	volume(volume) {
		if (typeof volume !== 'undefined') {
			this._audio.volume = volume
			return this
		}
		return this._audio.volume
	}

	loop(loop) {
		if (typeof loop !== 'undefined') {
			loop = !!loop
			this._audio.loop = loop
			if (loop) this._els.loopBtn.classList.remove('disabled_bplayer')
			else this._els.loopBtn.classList.add('disabled_bplayer')
			return this
		}
		return this._audio.loop
	}

	autoplay(autoplay) {
		if (typeof autoplay !== 'undefined') {
			autoplay = !!autoplay
			this._audio.autoplay = autoplay
			return this
		}
		return this._audio.autoplay
	}

	get paused() {
		return this._audio.paused
	}

	addListener(type, fn) {
		this._audio.addEventListener(type, fn, false)
		return this
	}

	removeListener(type, fn) {
		this._audio.removeEventListener(type, fn, false)
		return this
	}

	play() {
		this._audio.play()
		return this
	}

	pause() {
		this._audio.pause()
		return this
	}

	// Automatically convert audio tags with "controls"
	// attritube that have value of "bplayer" into bPlayer.
	static scan() {

		/* eslint {no-new: "off"} */
		const audioList = document.querySelectorAll('audio')
		for (let i = 0; i < audioList.length; i++) {
			if (audioList[i].getAttribute('controls') === 'bplayer') {
				const data = {
					src: audioList[i].src,
					loop: audioList[i].loop,
					title: audioList[i].title,
					autoplay: audioList[i].autoplay,
					slim: JSON.parse(audioList[i].getAttribute('slim')),
					cover: audioList[i].getAttribute('cover'),
					color: audioList[i].getAttribute('color'),
					artist: audioList[i].getAttribute('artist')
				}
				new bPlayer(audioList[i], data)
			}
		}
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = bPlayer
} else if (typeof define === 'function' && define.amd) {
	define(() => bPlayer)
} else {
	window.bPlayer = bPlayer
}

// Show information when bPlayer loaded successfully.
info(`bPlayer v${VERSION} loaded!`)
