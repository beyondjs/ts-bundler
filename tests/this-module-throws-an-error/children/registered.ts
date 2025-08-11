import type { DynamicProcessorInstance } from '..';
import type { ChildrenType } from '.';
// import validateChild from './validate-child';

export default class Registered extends Map {
	#dp: DynamicProcessorInstance;

	// get dp(): DynamicProcessorInstance { => No error if the return type is specified
	get dp() /*: DynamicProcessorInstance => El procesador lanza un error de compilación (compilando con tsc) (.d.ts) */ {
		return this.#dp;
	}

	get registered(): Registered {
		// => El procesador lanza un error de compilación (compilando con tsc) (.d.ts)
		// Es porque la clase es default
		return this;
	}

	constructor(dp: DynamicProcessorInstance) {
		super();
		this.#dp = dp;
	}
}
