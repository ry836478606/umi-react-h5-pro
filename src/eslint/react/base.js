module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb-base',
        'plugin:eslint-comments/recommended',
        'prettier',
        // 'plugin:prettier/recommended',
    ],
    plugins: ['eslint-comments', 'unicorn'],
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    rules: {
        'generator-star-spacing': 0,
        'function-paren-newline': 0,
        'import/no-unresolved': 'off',
        camelcase: 'off',
        'class-methods-use-this': 'off',
        'no-param-reassign': 'warn',
        'consistent-return': 'off',
        'no-unused-expressions': 'off',
        'no-empty': 'off',
        'import/no-dynamic-require': 'off',
        'no-underscore-dangle': 'off',
        'no-plusplus': 'off',
        'no-restricted-syntax': 'off',
        'no-continue': 'off',
        'no-await-in-loop': 'off',
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
            },
        ],
        'import/extensions': 'off',
        'max-classes-per-file': 'off',
        'eslint-comments/disable-enable-pair': 'warn',
        'eslint-comments/no-unlimited-disable': 'warn',
        'linebreak-style': 0,
        'no-prototype-builtins': 'off',
        'import/prefer-default-export': 'off',
        'import/no-default-export': [0, 'camel-case'],
        'no-use-before-define': [
            'error',
            { functions: false, classes: true, variables: true },
        ],
        'unicorn/prevent-abbreviations': 'off',
        'import/no-cycle': 0,
        'arrow-body-style': ['error', 'as-needed'],
        'object-curly-newline': 0,
        'implicit-arrow-linebreak': 0,
        'operator-linebreak': 0,
        'unicorn/prefer-modern-dom-apis': 'off',
    },
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },
    settings: {
        polyfills: ['fetch', 'Promise', 'URL', 'object-assign'],
    },
};