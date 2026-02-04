// import cjs from '@rollup/plugin-commonjs';
import cleaner from 'rollup-plugin-cleaner';
import { babel } from '@rollup/plugin-babel';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const extensions = ['.js', '.ts', '.json', '.tsx', '.jsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: 'src/index.ts',
	output: [
		{
			format: 'esm',
			file: 'dist/build.mjs',
		},
		{
			format: 'cjs',
			file: 'dist/build.cjs',
			exports: 'default',
		},
	],
	external: Object.keys(pkg.dependencies),
	plugins: [
		cleaner({ targets: ['./dist/'] }),
		babel({
			extensions,
			babelHelpers: 'bundled',
			presets: [
				['@babel/preset-env', { targets: { node: 'current' } }],
				'@babel/preset-typescript',
			],
		}),
		// nodeResolve({ extensions, preferBuiltins: true, browser: false }),
		// cjs({ extensions }),
	],
};

export default config;
