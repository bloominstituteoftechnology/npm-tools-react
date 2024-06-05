import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    rules: {
      // "semi": [2, "never"], // You do you!
    },
    languageOptions: { globals: globals.commonjs },
  },
  pluginJs.configs.recommended,
]
