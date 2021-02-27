import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/swiftory-jukebox.ts',
  output: {
    sourcemap: true,
    format: 'system',
    name: null, // ensure anonymous System.register
    file: 'dist/swiftory-jukebox.js',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,

      preprocess: sveltePreprocess({
        // https://github.com/kaisermann/svelte-preprocess/#user-content-options
        sourceMap: !production,
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
            require('postcss-nesting'),
          ],
        },
      }),
      emitCss: false,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `dist` directory and refresh the
    // browser on changes when not in production
    !production && livereload('dist'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn(
          'npm',
          ['run', 'serve', '--', '--dev', '--port 8501'],
          {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true,
          }
        );
      }
    },
  };
}
