import type { DynamicProcessorInstance } from '..';
import type { ChildrenType } from '.';
// import validateChild from './validate-child';

export default class extends Map {
	#dp: DynamicProcessorInstance;

	// get dp(): DynamicProcessorInstance { => No error if the return type is specified
	get dp() /*: DynamicProcessorInstance => El procesador lanza un error de compilación (compilando con tsc) (.d.ts) */ {
		return this.#dp;
	}

	constructor(dp: DynamicProcessorInstance) {
		super();
		this.#dp = dp;
	}
}
