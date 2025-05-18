/**
 * TS Processor settings
 */
const Hashes = require('./processor/hashes');
const Options = require('./processor/options');
const Analyzer = require('./processor/analyzer');
const Dependencies = require('./processor/dependencies');
const declarations = require('./packager/declaration');
const compilers = require('./packager/compilers');
const Code = require('./packager/code');

module.exports = {
	name: 'ts',
	Hashes,
	options: {
		Options,
		file: 'tsconfig.json'
	},
	sources: {
		extname: ['.ts', '.tsx']
	},
	Analyzer,
	Dependencies,
	packager: {
		compiler: packager => compilers.get(packager),
		declaration: packager => packager.compiler.is === 'tsc' && declarations,
		Js: Code
	}
};
