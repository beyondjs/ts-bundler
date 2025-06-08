const IMOutputs = require('@beyond-js/bundlers-sdk/bundler/processor/outputs/ims');
const swc = require('@swc/core');

module.exports = class extends IMOutputs {
	async _build(request, items) {
		const { errors, warnings } = items;

		const tsconfig = this.processor.sources.files.get('tsconfig.json');
		if (!tsconfig.valid) {
			warnings.push({ code: 'INVALID_TSCONFIG', message: `The tsconfig.json file is invalid.` });
		}

		const promises = [];
		this.processor.sources.inputs.forEach(file => {
			const item = items.get(file);
			const tsx = file.extaname === '.tsx';

			const promise = swc
				.transform(file.content, {
					filename: file.file,
					jsc: {
						target: 'es2022',
						parser: { syntax: 'typescript', tsx },
						transform: {},
						minify: { compress: false }
					},
					module: { type: 'es6' },
					sourceMaps: true
				})
				.then(result => {
					const { code, map } = result;
					item.generated.set({ code, map });
				})
				.catch(error => {
					item.issues.push('error', {
						code: 'TRANSPILE_ERROR',
						message: error.message
					});
				});

			promises.push(promise);
		});

		await Promise.all(promises);
	}

	hydrate(cached) {
		super.hydrate(cached);
	}

	serialize() {
		super.serialize({});
	}
};
