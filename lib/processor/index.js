const Processor = require('@beyond-js/bundlers-sdk/bundler/processor');

module.exports = class extends Processor {
	_process() {
		console.log('Bundler processor process => continue here'.green.bold);
	}
};
