import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';
import inject from '@rollup/plugin-inject';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    json(),
    external(),
    postcss(
      {
        extract: true ,
        modules: false,
        use: ['sass'],
      }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [],
      runtimeHelpers: true
    }),
    resolve({browser: true}),
    commonjs(),
    inject({
      jQuery: 'jquery',
    })
  ],
  external: ['bootstrap']
};
