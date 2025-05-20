module.exports = new (class {
	get(kind) {
		return kind === 'transpiler' ? require('./transpiler') : require(`./tsc`);
	}
})();
