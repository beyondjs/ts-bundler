const Module = require('@beyond-js/bundlers-sdk/module');
const Bundler = require('@beyond-js/bundlers-sdk/bundler');
const Processors = require('./processors');

module.exports = class extends Module {
	_conditional({ platform }) {
		return new Bundler(), (this, { platform }, { Processors });
	}

	_conditionals() {
		/**
		 * Process the platforms
		 */
		let { platforms } = this.specs.source.values;
		platforms = typeof platforms === 'string' ? [platforms] : platforms;
		platforms = platforms || ['default'];
		platforms = platforms?.filter(platform => platform && typeof platform === 'string');
		platforms = platforms instanceof Array ? platforms : ['default'];

		const conditions = platforms.map(platform => ({ platform }));
		return conditions;
	}
};
