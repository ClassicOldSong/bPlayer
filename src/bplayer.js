/* global VERSION */
'use strict'

// Import everything
import content from './bplayer.html'
import { warn } from './debug.js'
import './bplayer.css'

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

	let hs = ''
	let ms = ''
	let ss = ''

	hs = `${hours}:`
	if (isNaN(minutes)) ms = '00:'
	else ms = `${minutes}`
	if (isNaN(seconds)) ss = '00'
	else ss = `${seconds}`
	if (hours < 10) hs = `0${hours}:`
	if (minutes < 10) ms = `0${minutes}:`
	if (seconds < 10) ss = `0${seconds}`
	if (isNaN(hours) || hours <= 0) hs = ''
	return `${hs}${ms}${ss}`
}

const bPlayer = class {
	constructor(el, data) {
		// Ensure element
		if (!(el instanceof Element)) el = document.querySelector(el)

		// Check if the element has been turned into bPlayer
		if (el.bp instanceof bPlayer) return warn('This element has already been attached!')
		Object.defineProperty(el, 'bp' , { value: this })

		const parent = el.parentNode

		Object.defineProperty(this, '_el', { value: document.createElement('bplayer') })

		const _response = response.bind(this._el)

		for (let i = 0; i < el.attributes.length; i++) {
			if (!(/(src|title|artist|slim|cover|color|autoplay|loop|controls)/i.test(el.attributes[i].name))) this._el.setAttribute(el.attributes[i].name, el.attributes[i].value)
		}
		this._el.classList.add('bPlayer')
		this._el.insertAdjacentHTML('afterbegin', content)

		const status = {
			progressdown: false,
			volumedown: false,
			seekID: 0
		}

		// Get all needed elements
		const els = {
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

		// Check if the element is an audio tag
		if (el.tagName.toUpperCase() === 'AUDIO') {
			els.audio = el
			el = document.createTextNode('')
			parent.insertBefore(el, els.audio)
		} else els.audio = new Audio()

		// Hide the audio element
		els.audio.controls = false

		// Attach to DOM
		this._el.appendChild(els.audio)
		parent.replaceChild(this._el, el)
		window.addEventListener('resize', _response)
		_response()

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
		} = els

		progressCtl.addEventListener('click', function(e) {
			const w = this.clientWidth
			const x = e.offsetX
			if (x >= 0 && x <= w) els.audio.currentTime = x / w * els.audio.duration
		})
		progressCtl.addEventListener('mousedown', () => {
			status.progressdown = true
		})
		progressCtl.addEventListener('mouseup', () => {
			status.progressdown = false
		})
		progressCtl.addEventListener('mouseout', () => {
			status.progressdown = false
		})
		progressCtl.addEventListener('mousemove', function(e) {
			if (status.progressdown) {
				const w = this.clientWidth
				const x = e.offsetX
				if (x >= 0 && x <= w) els.audio.currentTime = x / w * els.audio.duration
			}
		})
		progressCtl.addEventListener('touchstart', () => {
			status.progressdown = true
		})
		progressCtl.addEventListener('touchend', () => {
			status.progressdown = false
		})
		progressCtl.addEventListener('touchmove', function(e) {
			if (status.progressdown) {
				const w = this.clientWidth
				const x = e.touches[0].pageX - e.target.getBoundingClientRect().left
				if (x >= 0 && x <= w) els.audio.currentTime = x / w * els.audio.duration
			}
		})
		volumeCtl.addEventListener('click', (e) => {
			const x = e.offsetX
			if (x >= 0 && x <= 80) els.audio.volume = x / 80
		})
		volumeCtl.addEventListener('mousedown', () => {
			status.volumedown = true
		})
		volumeCtl.addEventListener('mouseup', () => {
			status.volumedown = false
		})
		volumeCtl.addEventListener('mouseout', () => {
			status.volumedown = false
		})
		volumeCtl.addEventListener('mousemove', (e) => {
			if (status.volumedown) {
				const x = e.offsetX
				if (x >= 0 && x <= 80) els.audio.volume = x / 80
			}
		})
		volumeCtl.addEventListener('touchstart', () => {
			status.volumedown = true
		})
		volumeCtl.addEventListener('touchend', () => {
			status.volumedown = false
		})
		volumeCtl.addEventListener('touchmove', (e) => {
			if (status.volumedown) {
				const x = e.touches[0].pageX - e.target.getBoundingClientRect().left
				if (x >= 0 && x <= 80) els.audio.volume = x / 80
			}
		})
		volumeBtn.addEventListener('click', () => {
			this._el.muted = !this._el.muted
		})
		playCtl.addEventListener('click', () => {
			if (els.audio.paused) {
				this._el.play()
			} else {
				this._el.pause()
			}
		})
		loopBtn.addEventListener('click', () => {
			this._el.loop = !this._el.loop
		})

		els.audio.addEventListener('seeking', () => {
			// Cancle last seek before creating a new one
			if (status.seekID) window.clearTimeout(status.seekID)

			const currentTime = els.audio.currentTime
			const paused = els.audio.paused
			const resume = () => {
				status.seekID = 0
				els.audio.removeEventListener('canplay', resume)
				els.audio.currentTime = currentTime
				if (!paused) els.audio.play()
			}
			status.seekID = window.setTimeout(() => {
				els.audio.load()
				els.audio.addEventListener('canplay', resume)
			}, 500)
		})
		els.audio.addEventListener('seeked', () => {
			window.clearTimeout(status.seekID)
			status.seekID = 0
		})
		els.audio.addEventListener('timeupdate', function() {
			played.style.width = `${this.currentTime / this.duration * 100}%`
			current.textContent = formatTime(this.currentTime)
		})
		els.audio.addEventListener('progress', function() {
			const bufferedLength = this.buffered.length
			if (bufferedLength >= 1) loaded.style.width = `${this.buffered.end(bufferedLength - 1) / this.duration * 100}%`
			total.textContent = formatTime(this.duration)
		})
		els.audio.addEventListener('volumechange', function() {
			volumeVal.style.width = `${this.volume * 80}px`
		})
		els.audio.addEventListener('play', function() {
			playBtn.classList.add('hidden_bplayer')
			pauseBtn.classList.remove('hidden_bplayer')
			total.textContent = formatTime(this.duration)
		})
		els.audio.addEventListener('pause', function() {
			playBtn.classList.remove('hidden_bplayer')
			pauseBtn.classList.add('hidden_bplayer')
			total.textContent = formatTime(this.duration)
		})
		els.audio.addEventListener('ended', () => {
			if (!this.loop) {
				this.pause()
			}
		})

		Object.defineProperties(this._el, {
			data: {
				get() {
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
				set(data) {
					for (let i in defaults) {
						if (data[i] !== null && typeof data[i] !== 'undefined') {
							this[i] = data[i]
						}
					}
				}
			},
			slim: {
				get() {
					return this.className.split(' ').indexOf('slim_bPlayer') !== -1
				},
				set(slim) {
					slim = !!slim
					if (slim) this.classList.add('slim_bPlayer')
					else this.classList.remove('slim_bPlayer')
				}
			},
			src: {
				get() {
					return els.audio.src
				},
				set(src) {
					els.audio.src = src
				}
			},
			cover: {
				get() {
					return els.cover.style.backgroundImage.split('")')[0].split('url("')[1]
				},
				set(cover) {
					els.cover.style.backgroundImage = `url("${cover}")`
				}
			},
			title: {
				get() {
					return els.title.textContent
				},
				set(title) {
					els.title.textContent = title
				}
			},
			artist: {
				get() {
					return els.artist.textContent
				},
				set(artist) {
					els.artist.textContent = artist
				}
			},
			color: {
				get() {
					return els.played.style.backgroundColor
				},
				set(color) {
					const shadow = `${color} 0px 0px 3px`
					els.played.style.backgroundColor = color
					els.played.style.boxShadow = shadow
					els.volumeVal.style.backgroundColor = color
					els.volumeVal.style.boxShadow = shadow
				}
			},
			volume: {
				get() {
					return els.audio.volume
				},
				set(volume) {
					els.audio.volume = volume
				}
			},
			muted: {
				get() {
					return els.audio.muted
				},
				set(muted) {
					muted = !!muted
					els.audio.muted = muted
					if (muted) els.volumeBtn.classList.add('disabled_bplayer')
					else els.volumeBtn.classList.remove('disabled_bplayer')
				}
			},
			loop: {
				get() {
					return els.audio.loop
				},
				set(loop) {
					loop = !!loop
					els.audio.loop = loop
					if (loop) els.loopBtn.classList.remove('disabled_bplayer')
					else els.loopBtn.classList.add('disabled_bplayer')
				}
			},
			autoplay: {
				get() {
					return els.audio.autoplay
				},
				set(autoplay) {
					autoplay = !!autoplay
					els.audio.autoplay = autoplay
				}
			},
			paused: {
				get() {
					return els.audio.paused
				}
			},
			addListener: {
				value: (type, fn) => els.audio.addEventListener(type, fn, false)
			},
			removeListener: {
				value: (type, fn) => els.audio.removeEventListener(type, fn, false)
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
			this._el.data = data
			return this
		}
		return this._el.data
	}

	slim(slim) {
		if (typeof slim !== 'undefined') {
			this._el.slim = slim
			return this
		}
		return this._el.slim
	}

	src(src) {
		if (typeof src !== 'undefined') {
			this._el.src = src
			return this
		}
		return this._el.src
	}

	cover(cover) {
		if (typeof cover !== 'undefined') {
			this._el.cover = cover
			return this
		}
		return this._el.cover
	}

	title(title) {
		if (typeof title !== 'undefined') {
			this._el.title = title
			return this
		}
		return this._el.title
	}

	artist(artist) {
		if (typeof artist !== 'undefined') {
			this._el.artist = artist
			return this
		}
		return this._el.artist
	}

	color(color) {
		if (typeof color !== 'undefined') {
			this._el.color = color
			return this
		}
		return this._el.color
	}

	volume(volume) {
		if (typeof volume !== 'undefined') {
			this._el.volume = volume
			return this
		}
		return this._el.volume
	}

	muted(muted) {
		if (typeof muted !== 'undefined') {
			this._el.muted = muted
			return this
		}
		return this._el.muted
	}

	loop(loop) {
		if (typeof loop !== 'undefined') {
			this._el.loop = loop
			return this
		}
		return this._el.loop
	}

	autoplay(autoplay) {
		if (typeof autoplay !== 'undefined') {
			this._el.autoplay = autoplay
			return this
		}
		return this._el.autoplay
	}

	get paused() {
		return this._el.paused
	}

	addListener(...args) {
		this._el.addListener(...args)
		return this
	}

	removeListener(...args) {
		this._el.removeListener(...args)
		return this
	}

	play() {
		this._el.play()
		return this
	}

	pause() {
		this._el.pause()
		return this
	}

	get bp() {
		return this
	}

	// Automatically convert audio tags with "controls"
	// attritube that have value of "bplayer" into bPlayer.
	static scan() {

		/* eslint {no-new: "off"} */
		const audioList = document.querySelectorAll('audio[controls="bplayer"]')
		for (let i = 0; i < audioList.length; i++) {
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

	static get version() {
		return VERSION
	}
}

export default bPlayer

// Set style for info
const ls1 = `
background-color: #A91212;
font-weight: bold;
color: #FFF;
font-size: 20px;
`
const ls2 = `
background-color: #531212;
font-weight: bold;
color: #FEDCBA;
font-size: 20px;
`
const ls3 = `
background-color: #000;
font-weight: bold;
color: #FEDCBA;
font-size: 12px;
`
// Show information when bPlayer loaded successfully.
console.log(`%c bPlayer %c v${VERSION} \n%c See http://bplayer.js.org for detail. `, ls1, ls2, ls3)
