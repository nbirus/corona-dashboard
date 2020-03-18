module.exports = {
	root: true,
	env: {
		node: true,
		jest: true,
	},
	extends: [
		'plugin:vue/essential',
		'eslint:recommended',
		'prettier/vue',
		// 'plugin:prettier/recommended',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'no-undef': 'warn',
		'no-unused-vars': 'warn',
		'vue/valid-v-on': 'off',
		'vue/no-unused-components': 'warn',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
}
