const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		library: {
			type: 'commonjs-static',
		},
		clean: true,
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},

	module: {
		rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader' },
		],
	},

	externalsPresets: { node: true },
	externals: [
		nodeExternals({
			allowlist: ['lodash'],
		}),
	],
};
