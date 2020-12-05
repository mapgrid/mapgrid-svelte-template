import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const prod = process.env.NODE_ENV === 'production'
const watch = process.env.ROLLUP_WATCH

export default {
    input: 'src/index.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
    },
    plugins: [
        svelte({
            dev: !prod,
            css: css => {
                css.write('bundle.css')
            },
        }),
        resolve({
            dedupe: ['svelte', 'svelte/internal'],
        }),
        commonjs(),
        !!watch && livereload(),
        !!prod && terser(),
    ],
}
