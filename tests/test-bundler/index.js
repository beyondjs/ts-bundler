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
				console.log('  • Bundler:', conditional.bundler?.vname);
				console.log('  • Bundler specs:', conditional.bundler?.specs);
				console.log('  • Bundler settings:', conditional.bundler?.settings);
				console.log('  • Bundler processors:', conditional.bundler?.processors);
			} else {
				console.log('  • No default bundler found');
			}
		}
	}

	console.log('End!');
})().catch(exc => console.error(exc));
