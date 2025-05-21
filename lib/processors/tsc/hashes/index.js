const ProcessorSourcesHashes = require('@beyond-js/bundlers-sdk/bundler/processor/sources/hashes');

module.exports = class extends ProcessorSourcesHashes {
	get dp() {
		return 'ts.processor.sources.hashes';
	}

	constructor(processor) {
		super(processor);

		// const { hashes } = processor.dependencies.declarations;
		// super.setup(new Map([['declarations.hashes', { child: hashes }]]));
	}

	_compute() {
		// return this.children.get('declarations.hashes').child.value;
	}
};
