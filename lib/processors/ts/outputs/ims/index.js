const IMs = require('@beyond-js/bundlers-sdk/bundler/processor/outputs/ims');

module.exports = class extends IMs {
	_process() {
		const specs = this.specs.values;
		const settings = this.settings.values;

		console.log('Bundler processor process => continue here'.green.bold, specs, settings);
	}
};
