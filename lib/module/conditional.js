const Bundler = require('@beyond-js/bundlers-sdk/bundler');

module.exports = class extends Bundler {
	_specs(values) {
		const { processors } = values;
		return { processors };
	}
};
