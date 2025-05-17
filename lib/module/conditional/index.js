const Bundler = require('@beyond-js/bundlers-sdk/bundler');
const Specs = require('./specs');

module.exports = class extends Bundler {
	constructor(module, conditions) {
		const specs = new Specs();
		super(module, conditions, specs);

		specs.setup(this);
	}
};
