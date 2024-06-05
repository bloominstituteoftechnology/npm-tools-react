import globals from "globals"
import pluginJs from "@eslint/js"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"


export default [
  {
    rules: {
      "semi": [2, "always"],
    },
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
]
