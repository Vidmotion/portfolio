import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design phase output and documentation — not application code
    "Claude/**",
    "docs/**",
    "design/**",
    "references/**",
    "figma/**",
  ]),
  // Must be last — disables ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]);

export default eslintConfig;
