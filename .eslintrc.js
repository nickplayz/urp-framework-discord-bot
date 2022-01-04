module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2020: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'quote-props': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-var-requires': 0,
        'no-useless-constructor': 'off',
        'no-prototype-builtins': 'off',
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always',
        }],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            accessibility: 'explicit',
            overrides: {
                accessors: 'no-public',
                constructors: 'no-public',
                methods: 'explicit',
                properties: 'explicit',
                parameterProperties: 'explicit',
            },
        }],
        '@typescript-eslint/explicit-function-return-type': ['error'],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/triple-slash-reference': 'off',
    },
};