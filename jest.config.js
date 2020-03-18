module.exports = {
	moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.jsx?$': 'babel-jest',
	},
	setupFiles: ['jest-localstorage-mock', '<rootDir>/tests/setup.js'],
	transformIgnorePatterns: ['/node_modules/(?!vuetify)'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	snapshotSerializers: ['jest-serializer-vue'],
	testMatch: [
		'**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
		'**/tests/integration/**/*.spec.(js|jsx|ts|tsx)',
	],
	testURL: 'http://localhost/',
	watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	coveragePathIgnorePatterns: [
		'/tests/',
		'src/data/',

		// no-need-to-test files
		'src/store.js',
		'components/utils/Expand.vue',

		// need-to-be-tested files
		'src/components/form/wrappers/ChipWrapper',
		'src/utils/CopyUtil',
		'src/components/form/fields/index',
		// 'src/services/ChartService',
	],
	coverageThreshold: {
		global: {
			lines: 85,
		},
	},
}
