const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');
const Hash = require('./hash');
const TsConfig = require('./tsconfig');
// const Analyzer = require('./analyzer');
// const Dependencies = require('./dependencies');
const InternalModules = require('./outputs/ims');

module.exports = class extends Processor {
	constructor(...args) {
		super(...args, {
			// Analyzer,
			// Dependencies,
			sources: {
				inputs: { extname: ['.ts', '.tsx'] },
				files: [{ TsConfig, file: 'tsconfig.json' }],
				Hash
			},
			outputs: { InternalModules }
		});
	}
};
