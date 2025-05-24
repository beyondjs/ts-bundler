const Module = require('@beyond-js/bundlers-sdk/module');
const Conditional = require('./conditional');

module.exports = class extends Module {
	_specs(specs) {
		const reserved = ['platforms'];

		// All the properties that are not reserved for the module specification
		// are considered the specs of the 'ts' processor
		const processor = {};
		for (const [key, value] of Object.entries(specs)) {
			if (reserved.includes(key)) continue;
			processor[key] = value;
		}

		// Process platforms
		let { platforms } = specs;
		platforms = typeof platforms === 'string' ? [platforms] : platforms;
		platforms = platforms || ['default'];
		platforms = platforms?.filter(platform => platform && typeof platform === 'string');
		platforms = platforms instanceof Array ? platforms : ['default'];

		const values = { platforms, processors: { ts: processor } };
		return { values };
	}

	_conditional({ platform }) {
		return new Conditional(this, { platform });
	}

	_conditionals() {
		const { platforms } = this.specs.values;
		const conditions = platforms.map(platform => ({ platform }));
		return conditions;
	}

	__conditional({ key }) {
		const processors = new Map([['ts', {}]]);
		return new Bundler(this, processors, { key, platform: key });
	}
};
