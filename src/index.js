const Hashes = require('@beyond-js/ts-processor/processor/hashes');
const Options = require('@beyond-js/ts-processor/processor/options');
const Analyzer = require('@beyond-js/ts-processor/processor/analyzer');
const Dependencies = require('@beyond-js/ts-processor/processor/dependencies');
const declarations = require('@beyond-js/ts-processor/packager/declaration');
const compilers = require('@beyond-js/ts-processor/packager/compilers');
const Code = require('@beyond-js/ts-processor/packager/code');

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
