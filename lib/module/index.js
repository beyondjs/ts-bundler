const Module = require('@beyond-js/bundlers-sdk/module');
const Bundler = require('@beyond-js/bundlers-sdk/bundler');
const Processors = require('@beyond-js/bundlers-sdk/bundler/processors');

module.exports = class extends Module {
	_conditionals() {
		let { platforms } = this.specs.source.values;
		platforms = typeof platforms === 'string' ? [platforms] : platforms;
		platforms = platforms || ['default'];
		platforms = platforms?.filter(platform => platform && typeof platform === 'string');
		platforms = platforms instanceof Array ? platforms : ['default'];

		const conditions = platforms.map(platform => ({ platform }));
		return conditions;
	}

	_conditional({ platform }) {
		return new Bundler()(this, { platform }, { Processors });
	}

	/**
	 * All the properties that are not reserved for the module specification
	 * are considered the specs of the 'ts' processor
	 */
	_processors() {
		const reserved = ['platforms'];
		const specs = {};
		for (const [key, value] of Object.entries(this.specs.source.values)) {
			if (reserved.includes(key)) continue;
			specs[key] = value;
		}

		const processors = new Map([['ts', { specifier: '@beuyond-js/ts-bundler/processor', specs }]]);
		return { processors };
	}
};
