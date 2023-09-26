module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "eslint:recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parser: "vue-eslint-parser", // 新增
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        project: ["tsconfig.json"], // 新增
        extraFileExtensions: [".vue"], // 新增
        tsconfigRootDir: __dirname, // 新增
        "vue/no-reserved-component-names": ["error", {
            "disallowVue3BuiltInComponents": true
        }],
        "vue/no-unused-components": "error",
        "vue/multi-word-component-names": ["error", {
            "ignores": ["index"]
        }]
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],

    }
};
