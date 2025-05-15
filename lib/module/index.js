const Module = require('@beyond-js/bundlers-sdk/module');
const Conditional = require('@beyond-js/bundlers-sdk/module-conditional/js');
const Processor = require('@beyond-js/ts-bundler/processor');

module.exports = class extends Module {
	_conditionals() {
		const specs = this.specs.values;
		specs.platforms = typeof specs.platforms === 'string' ? [specs.platforms] : specs.platforms;
		specs.platforms = specs.platforms?.filter(platform => platform && typeof platform === 'string');
		const platforms = specs.platforms instanceof Array ? specs.platforms : ['default'];

		return platforms;
	}

	_conditional({ key }) {
		const processors = new Map([['ts', Processor]]);
		return new Bundler(this, processors, { key, platform: key });
	}

	_specs() {
		const specs = this.specs.values;

		if (!['object', 'string'].includes(typeof specs)) {
			return { errors: ['Invalid configuration'] };
		}

		const reserved = ['subpath', 'platforms'];
		const values = {};
		for (const property of reserved) {
			if (config[property] === void 0) continue;

			values[property] = config[property];
			delete config[property];
		}
		values.processors = { ts: config };
		return { values };
	}
};
