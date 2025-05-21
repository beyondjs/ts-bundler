const ProcessorSourcesHash = require('@beyond-js/bundlers-sdk/bundler/processor/sources/hash');

module.exports = class extends ProcessorSourcesHash {
	get dp() {
		return 'ts.processor.sources.hash';
	}

	constructor(processor) {
		super(processor);

		// const { hash } = processor.dependencies.declarations;
		// super.setup(new Map([['declarations.hash', { child: hash }]]));
	}

	_compute() {
		// return this.children.get('declarations.hash').child.value;
	}
};
