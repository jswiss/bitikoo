module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: '@react-native-community',
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'@typescript-eslint',
		'jest',
		'react',
		'react-hooks',
		'react-native',
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jest/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	env: {
		'react-native/react-native': true,
		'jest/globals': true,
	},
	rules: {
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-color-literals': 0,
		'react-native/no-raw-text': 2,
		'react/prop-types': 0,
		'react-native/no-single-element-style-arrays': 2,
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-magic-numbers': 'warn',
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/explicit-function-return-type': 0,
		'@typescript-eslint/no-use-before-define': 0,
		'@typescript-eslint/camelcase': 0,
	},
};
