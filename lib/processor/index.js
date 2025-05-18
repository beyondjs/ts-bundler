const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');

module.exports = class extends Processor {
	_process() {
		const specs = this.specs.values;
		const settings = this.settings.values;

		console.log('Bundler processor process => continue here'.green.bold, specs, settings);
	}
};
