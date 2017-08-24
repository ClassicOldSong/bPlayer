import chalk from 'chalk'

// Rollup plugins
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import progress from 'rollup-plugin-progress'
import postcss from 'rollup-plugin-postcss'
import html from 'rollup-plugin-html'
import json from 'rollup-plugin-json'

// Log build environment
console.log('Target:', chalk.bold.green(process.env.NODE_ENV || 'development'))
switch (process.env.BUILD_ENV) {
	case 'DEV': {
		console.log(chalk.cyan`
+---------------+
| DEVELOP BUILD |
+---------------+
`)
		break
	}
	case 'CI': {
		console.log(chalk.green`
+----------+
| CI BUILD |
+----------+
`)
		break
	}
	default: {
		console.log(chalk.yellow`
+--------------+
| NORMAL BUILD |
+--------------+
`)
	}
}

export default {
	input: 'src/bplayer.js',
	output: {
		name: 'bPlayer',
		format: 'umd',
		sourcemap: true,
	},
	devDest: 'test/bplayer.dev.js',
	proDest: 'dist/bplayer.min.js',
	plugins: [
		progress({
			clearLine: false
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs(),
		json(),
		html({
			include: 'src/*.html'
		}),
		postcss(),
		eslint({
			exclude: ['**/*.html', '**/*.css', '**/*.json']
		}),
		buble({
			transforms: {
				modules: false,
				dangerousForOf: true
			},
			objedtAssign: 'Object.assign'
		}),
		replace({
			ENV: `'${process.env.NODE_ENV || 'development'}'`
		}),
		(process.env.NODE_ENV === 'production' && uglify())
	]
}
