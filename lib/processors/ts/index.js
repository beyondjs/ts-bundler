const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');
const TsConfig = require('../tsconfig');
const InternalModules = require('./ims');
// const Analyzer = require('./analyzer');
// const Dependencies = require('./dependencies');

module.exports = class extends Processor {
	constructor(...args) {
		super(...args, {
			// Analyzer,
			// Dependencies,
			sources: {
				inputs: { extname: ['.ts', '.tsx'] },
				files: [{ file: 'tsconfig.json', File: TsConfig }]
			},
			outputs: { InternalModules }
		});
	}
};
