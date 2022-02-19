const prettier = require("./prettier.config.js")

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "import"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "prettier/prettier": ["error", prettier],
    "no-var": "error",
    "prefer-const": "warn",
  },
  overrides: [
    {
      files: ["**/*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": "allow-with-description",
          },
        ],
        "@typescript-eslint/no-extra-semi": "off",
      },
    },
    {
      files: ["**/*.test.ts"],
      env: {
        jest: true,
      },
    },
    {
      files: ["*.js"],
      env: {
        node: true,
      },
    },
  ],
}
