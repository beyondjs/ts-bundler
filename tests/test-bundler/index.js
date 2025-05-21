const Workspace = require('beyond/workspace');
const { join } = require('path');
require('colors');

const path = join(__dirname, 'files');
const workspace = new Workspace(path);

(async () => {
	await workspace.packages.ready;
	for (const pkg of workspace.packages.values()) {
		await pkg.ready;
		await pkg.modules.ready;

		// Show package information
		const { errors, warnings } = pkg.bundlers;
		console.log('Package:'.green.bold, pkg.vname.green);
		console.log(`  • Registered bundlers: ${[...pkg.bundlers.keys()].join(', ')}`);
		errors.length && console.log(`  • Bundlers errors: ${[...pkg.bundlers.errors].join(', ')}`);
		warnings.length && console.log(`  • Bundlers warnings: ${[...pkg.bundlers.warnings].join(', ')}`);

		// Show modules information
		console.log('\nShow modules information\n'.green.bold);

		for (const module of pkg.modules.values()) {
			await module.ready;
			console.log('Module:'.green.bold, module.subpath?.green);

			const { errors, warnings } = module;
			errors ?? console.log(`  • Errors found: [...${module.errors}].join(', ')}`);
			warnings ?? console.log(`  • Warnings found: [...${module.warnings}].join(', ')}`);

			await module.conditionals.ready;
			console.log('  • Conditionals:', [...module.conditionals.keys()].join(', '));

			const conditional = module.conditionals.get('default');
			if (conditional) {
				await conditional.ready;
				const ts = conditional.processors.get('ts');
				await ts.sources.inputs.ready;
				console.log('  • Bundler files:', [...ts.sources.inputs.keys()]);
			} else {
				console.log('  • No default bundler found');
			}
		}
	}

	console.log('End!');
})().catch(exc => console.error(exc));
