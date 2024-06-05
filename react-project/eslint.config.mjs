import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"

export default [
  {
    files: ["frontend/**/*.js"],
    rules: {
      // "semi": [2, "always"], // You do you!
    },
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["backend/**/*.js"],
    rules: {
      // "semi": [2, "never"], // You do you!
    },
    languageOptions: { globals: globals.commonjs },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
]
