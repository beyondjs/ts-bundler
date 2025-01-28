const Bundle = require('@beyond-js/bundlers-sdk/bundler');

module.exports = class extends Bundle {
	processConfig(config) {
		if (!['object', 'string'].includes(typeof config)) {
			return { errors: ['Invalid configuration'] };
		}
		config = Object.assign({}, config);

		const reserved = ['name', 'platforms'];

		const value = {};
		for (const prop of reserved) {
			if (config[prop] === void 0) continue;
			value[prop] = config[prop];
			delete config[prop];
		}

		value.ts = config;
		return { value };
	}
};
