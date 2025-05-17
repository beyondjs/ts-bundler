const DynamicProcessor = require('@beyond-js/dynamic-processor')();
const equal = require('@beyond-js/equal');

module.exports = class extends DynamicProcessor {
	get dp() {
		return 'module.conditional.specs';
	}

	#specs;

	#values;
	get values() {
		return this.#values;
	}

	setup(conditional) {
		this.#specs = conditional.module.specs;
		super.setup(new Map([['specs', { child: this.#specs }]]));
	}

	_process() {
		const { processors } = this.#specs.values;
		const values = { processors };
		const changed = equal(values, this.#values);
		if (!changed) return false;

		this.#values = values;
	}
};
