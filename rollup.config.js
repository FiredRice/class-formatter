import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'lib/esm5/index.js',
	output: [
		{
			name: 'ClassFormatter',
			format: 'umd',
			file: 'lib/bundles/class-formatter.umd.js',
			sourcemap: true,
		},
		{
			name: 'ClassFormatter',
			format: 'umd',
			file: 'lib/bundles/class-formatter.umd.min.js',
			sourcemap: true,
			plugins: [terser()],
		},
	],
	onwarn: function (warning) {
		if (warning.code === 'THIS_IS_UNDEFINED') {
			return;
		}
		console.error(warning.message);
	},
	plugins: [commonjs(), nodeResolve()],
	external: ['lodash'],
};
