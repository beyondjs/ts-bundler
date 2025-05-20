const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');
const IMs = require('./ims');
const Hash = require('./hash');
const TsConfig = require('./tsconfig');
const Analyzer = require('./analyzer');
const Dependencies = require('./dependencies');

module.exports = class extends Processor {
	constructor(...args) {
		super(...args, {
			IMs,
			Analyzer,
			Dependencies,
			sources: {
				inputs: { extname: ['.ts', '.tsx'] },
				files: [{ TsConfig, file: 'tsconfig.json' }],
				Hash
			},
			compiler: kind => compilers.get(kind)
		});
	}
};
