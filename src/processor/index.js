/**
 * TS Bundle settings
 */
const Hashes = require('@beyond-js/ts-bundler/processor/hashes');
const Options = require('@beyond-js/ts-bundler/processor/options');
const Analyzer = require('@beyond-js/ts-bundler/processor/analyzer');
const Dependencies = require('@beyond-js/ts-bundler/processor/dependencies');
const declarations = require('@beyond-js/ts-bundler/packager/declaration');
const compilers = require('@beyond-js/ts-bundler/packager/compilers');
const Code = require('@beyond-js/ts-bundler/packager/code');

module.exports = {
	name: 'ts',
	Hashes,
	options: {
		Options,
		file: 'tsconfig.json',
	},
	sources: {
		extname: ['.ts', '.tsx'],
	},
	Analyzer,
	Dependencies,
	packager: {
		compiler: packager => compilers.get(packager),
		declaration: packager => packager.compiler.is === 'tsc' && declarations,
		Js: Code,
	},
};
