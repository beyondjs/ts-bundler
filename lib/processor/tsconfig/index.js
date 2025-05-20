const ProcessorInputFile = require('@beyond-js/bundlers-sdk/processor/sources/file');
const ts = require('typescript');
const equal = require('@beyond-js/equal');

module.exports = class extends ProcessorInputFile {
	#errors = [];
	get errors() {
		return this.#errors;
	}

	#defaults;
	#value;
	get value() {
		return this.#value;
	}

	constructor(processor, meta) {
		super(processor, meta);

		this.#defaults = {
			incremental: true,
			module: ts.ModuleKind.ESNext,
			target: ts.ScriptTarget.ESNext,
			moduleResolution: ts.ModuleResolutionKind.NodeJs,
			sourceMap: true,
			declarationMap: true,
			inlineSources: false,
			declaration: true,
			allowSyntheticDefaultImports: true
			// noEmitOnError: true,
			// declarationMap: true
		};
	}

	async _process(request) {
		await super._process(request);
		if (request !== this._request) return;

		if (!this.valid) return;

		this.#value = void 0;

		let value;
		try {
			value = this.content ? JSON.parse(this.content) : {};
			value = value.compilerOptions;
			value = value ? value : {};
			value.jsx && (value.jsx = ts.JsxEmit.React);
			delete value.paths;
			delete value.outDir;
			delete value.moduleResolution;
			value.noImplicitUseStrict = true;
			value.tsBuildInfoFile = require('path').join(this.processor.path, 'tsconfig.tsbuildinfo');
		} catch (exc) {
			this.errors.push(`Error parsing tsconfig.json - ${exc.message}`);
			return;
		}

		value = Object.assign(value, this.#defaults);
		const changed = !equal(value, this.#value);
		if (!changed) return false;

		this.#value = value;
	}
};
