const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');
const ProcessorFiles = require('@beyond-js/bundlers-sdk/bundler/processor/sources/files');

module.exports = class extends Processor {
	#files;

	_process() {
		const specs = this.specs.values;
		const settings = this.settings.values;

		console.log('Bundler processor process => continue here'.green.bold, specs, settings);
	}
};
