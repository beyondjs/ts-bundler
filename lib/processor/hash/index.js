const ProcessorHashes = require('@beyond-js/bundlers-sdk/processor/sources/hash');

module.exports = class extends ProcessorHashes {
	get dp() {
		return 'ts.processor.sources.hash';
	}

	constructor(processor) {
		super(processor);

		const { hash } = processor.dependencies.declarations;
		super.setup(new Map([['declarations.hash', { child: hash }]]));
	}

	_compute() {
		return this.children.get('declarations.hash').child.value;
	}
};
