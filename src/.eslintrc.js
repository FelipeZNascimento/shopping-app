module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    "rules": {
        // disable the rule for all files
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react-hooks/exhaustive-deps": 'off'
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src/"]
            }
        }
    }

};
