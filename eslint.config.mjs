import pluginJs from '@eslint/js'
import eslintPluginPlaywright from 'eslint-plugin-playwright'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default [
    {
        ignores: [
            '**/*.json',
            'node_modules/',
            'dist/',
            'build/',
            'playwright-report/',
            'test-results/',
            '*.config.ts',
            '*.config.mjs',
            '*.config.js',
            'junit-*.xml',
            '**/*.js',
        ],
    },
    { files: ['**/*.ts'] },
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                projectService: true,
            },
            globals: {
                browser: true,
                es2021: true,
            },
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-expressions': 'error',
            'no-console': 'off',
            'no-empty': 'warn',
        },
    },
    eslintPluginPlaywright.configs['flat/recommended'],
    {
        rules: {
            'playwright/expect-expect': 'off',
            'playwright/no-force-option': 'off',
            'playwright/no-skipped-test': 'warn',
            'playwright/no-wait-for-timeout': 'off',
            'playwright/no-conditional-in-test': 'off',
        },
    },
    eslintPluginPrettierRecommended,
]
