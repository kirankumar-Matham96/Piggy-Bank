import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },
  {
    files: ["backend/**/*.js", "backend/**/*.ts"],
    env: {
      node: true,
      es2022: true,
    },
    rules: {
      "no-console": "warn",
      "strict": ["error", "global"],
    },
  },
  {
    files: ["frontend/**/*.js", "frontend/**/*.ts", "frontend/**/*.tsx"],
    languageOptions: {
      sourceType: "module",
    },
    plugins: {
      react: react,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    env: {
      browser: true,
      es2022: true,
    },
  },
];
